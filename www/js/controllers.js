angular.module('avshell.controllers', [])

.controller('CollectCtrl', function($scope, $http, $state) {

  $scope.CollectThreadList = angular.fromJson(window.localStorage['collects']);

  $scope.gotoThreadDetail = function(link, threadTitle) {

    window.localStorage['threadUrl'] = link;
    window.localStorage['threadTitle'] = threadTitle;

    $state.go('tab.threadDetail', {});

  }

  // $.ajax({
  //  type:"GET",
  //  url:baseurl + '/htm_data/7/1509/1637251.html',
  //  headers: {
  //      "Accept": "application/json;charset=utf-8",
  //      //"Accept-Charset":"charset=utf-8"
  //  },
  //  dataType:"html",
  //  success:function(resp){
  //   $(resp).find("table table td").each(function(index, el) {
  //     $("#cl").prepend(decodeURIComponent($(el).html()));
  //   });
  //  }
  // });   

  // 注意，使用 AngularJS 的http请求，得到的返回值，要用 .data 获取
  // $http.get(baseurl + '/htm_data/7/1509/1637251.html', 
  //   {header : {'Content-Type' : 'application/json; charset=GBK'}
  //   ).then(function(resp) {
  //   console.log('Success', resp);
  //   // For JSON responses, resp.data contains the result
  //   $(resp.data).find("table th table td").each(function(index, el) {
  //       $("#cl").prepend(el);
  //     });
  // }, function(err) {
  //   console.error('ERR', err);
  //   // err.status will contain the status code
  // })

})

/**
 * 版块列表
 */
.controller('ForumsCtrl', function($scope, $http, $state, Forums) {

  $scope.forumList = Forums.all();

  $scope.baseUrl = baseurl;

  // 和从 帖子列表页 跳转到 详情页 不同，列表页数据的 html 是动态生成的，只能用 onclick 才能触发动作（可能是 AngularJS 和 js 的加载顺序）
  // 而 版块列表页 中，版块 html 是固定的，一开始就在模板里显示了，所以必须用 ng-click
  // 如果把 帖子列表页 改成：先显示空白列表的html，再逐个填充数据，也可以用 ng-click。
  $scope.gotoThreadList = function(link, forumTitle) {
    //avshell.fetchAndDecode(link, "gbk", "threadList", forumTitle);

    // link 临时
    window.localStorage['forumUrl'] = link;
    window.localStorage['forumTitle'] = forumTitle;

    $state.go('tab.threadList', {});

  }

})


/**
 * 帖子列表
 */
.controller('ThreadListCtrl', function($scope, $sce, $location, $rootScope, $stateParams, $state, $ionicHistory, Threads) {

  $rootScope.$on('$ionicView.beforeEnter', function() {

    $rootScope.hideTabs = false;

    if ($state.current.name === 'tab.threadList') {
      $rootScope.hideTabs = true;
    }
  });

  // 部分代码复制粘贴来自 forum
  $scope.gotoThreadListPage = function(link, forumTitle) {
    //avshell.fetchAndDecode(link, "gbk", "threadList", forumTitle);

    // link 临时
    window.localStorage['forumUrl'] = link;
    window.localStorage['forumTitle'] = forumTitle;

    //$state.go('tab.threadList', {});
    $location.path('tab.threadList', {});

  }

  var link = window.localStorage['forumUrl'];
  var forumTitle = window.localStorage['forumTitle'];

  console.log(link);

  // $scope.threadListBack = function(){
  //   if(xhr){
  //     xhr.abort();
  //     $scope.threadList = null;

  //     //cancel image downloads
  //     if(window.stop !== undefined)
  //     {
  //          window.stop();
  //     }
  //     else if(document.execCommand !== undefined)
  //     {
  //          document.execCommand("Stop", false);
  //     }

  //     //console.info("中断 ajax");
  //   }

  //   // $( document ).ajaxStop(function() {
  //   //   console.info("中断 ajax");
  //   // });

  //   $ionicHistory.goBack();
  // }

  $scope.forumTitle = forumTitle;

  $scope.threadList = [];
  $scope.pages = [];
  $scope.filters = []; //筛选 如精华、类别等

  if (link) {

    $(".loading").show();

    var xhr = $.ajax({
      type: "GET",
      url: link,
      data: "",
      //dataType: 'arraybuffer',
      success: function(response) {

        $(".loading").hide();

        decodedString = response;

        // 分页
        $(decodedString).find(".pages:first a").each(function(index, el) {
          page_link = baseurl + "/" + $(el).attr("href");
          page_html = avshell.removeHTMLTag($(el).html());

          $scope.pages.push({
            page_link: page_link,
            page_html: page_html
          });
        });

        // 筛选
        $(decodedString).find("th.h:first>a").each(function(index, el) {
          filter_link = baseurl + "/" + $(el).attr("href");
          filter_html = avshell.removeHTMLTag($(el).html());

          $scope.filters.push({
            filter_link: filter_link,
            filter_html: filter_html
          });
        });
        //剔除最后一个多余
        $scope.filters.pop();

        // 列表
        $(decodedString).find(".tr3 h3").each(function(index, el) {
          element = $(el).find("a");

          link = baseurl + "/" + element.attr("href");

          // // 浏览器测试模式,使用一个本地文件
          // if ('browser' == devicemode) {
          //   link = baseurl + threadDetailUrl;
          // }

          //动态创建的 html 中，ng-click 无效（onclick有效），因此

          title = avshell.removeHTMLTag($(element).html());

          $scope.threadList.push({
            title: title,
            link: link
          });


        });

        $scope.$apply();

        decodedString = null;
      },
      complete: function(XHR, TS) {

        //使用 complete 回收 XmlHttpRequest 对象,见 http://www.jb51.net/article/30458.htm
        XHR = null
      }
    });

  }

  $scope.gotoThreadDetail = function(link, threadTitle) {

    window.localStorage['threadUrl'] = link;
    window.localStorage['threadTitle'] = threadTitle;

    $state.go('tab.threadDetail', {});

  }

})


/**
 * 帖子详情
 */
.controller('ThreadDetailCtrl', function($scope, $rootScope, $state,$cordovaFileTransfer, $timeout, $sce, $interpolate, $compile, $stateParams, $ionicHistory,$ionicPopover, Threads) {

  $rootScope.$on('$ionicView.beforeEnter', function() {

    $rootScope.hideTabs = false;

    if ($state.current.name === 'tab.threadDetail') {
      $rootScope.hideTabs = true;
    }
  });


  var link = window.localStorage['threadUrl'];
  var threadTitle = window.localStorage['threadTitle'];

  var imageUrls = [];

  //umshare 太久没有更新，没有微信
  var opt = {
    'data': {
      'content': {
        'text': threadTitle + " " + link,
        'img': 'img/icon-72.png'
      }
    }
  }
  $("#shareBtn").umshare(opt);

  $scope.collect = function(link, title) {

    collects = angular.fromJson(window.localStorage['collects']);

    if (!collects) {
      collects = [];
    }

    isCollected = false;
    for (i = 0; i < collects.length; i++) {
      if (collects[i].link == link) {
        alert("已经收藏过了");
        isCollected = true;
        return false;
      }
    }
    if (isCollected == false) {
      newCollect = {
        link: link,
        title: title
      };
      collects.push(newCollect);
      alert("收藏成功");
    }

    window.localStorage['collects'] = angular.toJson(collects);
    console.log(window.localStorage['collects']);
  }

  //$scope.caption = 'http://www.yesemn.com/uploads/allimg/150313/1-150313161341.jpg';

  // $scope.gotScrolled = function() {
  //   console.log('Got scrolled');
  // };

  $scope.threadDetailBack = function() {
    if (xhr) {
      xhr.abort();
      $scope.htmlShow = null;

      //cancel image downloads
      if (window.stop !== undefined) {
        window.stop();
      } else if (document.execCommand !== undefined) {
        document.execCommand("Stop", false);
      }

      //console.info("中断 ajax");
    }

    // $( document ).ajaxStop(function() {
    //   console.info("中断 ajax");
    // });

    $ionicHistory.goBack();
  }

  $scope.threadTitle = threadTitle;
  $scope.threadLink = link;
  $scope.threadDetail = '';

  if (link) {

    $(".loading").show();

    var xhr = $.ajax({
      type: "GET",
      url: link,
      data: "",
      //dataType: 'arraybuffer',
      success: function(response) {

        $(".loading").hide();

        // 详情页
        // 注意使用了 <input type="image" 来加载图片，要在图片加载完毕后过滤掉

        // 如果连接是“read.php" 的跳转形式（可能是最新贴才有的），按下面的 DOM 获取方式，读取不到内容……

        var firstFloor = $(response).find(".tpc_content").first();

        //htmlDetail = htmlDetail.replace(/<[input][^>]+>/g, "");
        //htmlDetail = htmlDetail.replace(/[&nbsp;|<|>]/ig, '');

        $(firstFloor).find("input:image, img").each(function(index, el) {
          //img.attr('data-url', $(this).attr("src"));
          $(el).removeAttr('onclick').removeAttr('type').removeAttr('style').removeAttr('disabled').addClass('lazy').wrap("<p></p>");
          //$(el).attr('rn-lazy-background', "$(el).attr('src')");//$(el).attr('src')
          //$(el).attr('src', 'img/ionic.png');

          //存储所有图片路径，便于下载
          imageUrls.push($(el).attr('src'));
        });

        $(firstFloor).find("a").each(function(index, el) {

        });

        var htmlDetail = $(firstFloor).html();

        //htmlDetail = htmlDetail.replace(/<[\/|span|font][^>]+>/g, "");//这段会把 a 的html替换掉，暂不知原因
        htmlDetail = htmlDetail.replace(/input/ig, 'img');
        //htmlDetail = htmlDetail.replace(/src/ig, 'image-lazy-src');

        //$scope.threadDetail = $interpolate(htmlDetail)($scope);//$sce.trustAsHtml(htmlDetail);//$compile('<div>{{caption}}</div>')($scope);
        $scope.threadDetail = $sce.trustAsHtml(htmlDetail);
        $scope.$apply();

        //$("#thread-detail").html(htmlDetail);


        htmlDetail = null;
      },
      complete: function(XHR, TS) {

        //使用 complete 回收 XmlHttpRequest 对象,见 http://www.jb51.net/article/30458.htm
        XHR = null
      }
    });

  }

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.downloadFiles = function($event) {

    
    $scope.popover.show($event);
    
    $.each( imageUrls, function(i, n){

      var url = n;
       
      // File name only
      var filename = url.split("/").pop();
       
      // Save location
      var targetPath = cordova.file.externalRootDirectory + "avshellDowload/" + threadTitle + "/" + filename;
       
      $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
          
      }, function (error) {
          
      }, function (progress) {
          
      });

    });

    $scope.popover.hide();//其实这个动作太快了…… 可能因为已经加载到缓存了
    alert("下载完成，请到该路径下查看：/SD卡根目录/avshellDownload/帖子标题/ ");

  }

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
