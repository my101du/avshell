 window.umappkey = '560780dae0f55aecb200abf1'; //设置来自友盟的APPKEY,请从友盟网站申请http://www.umeng.com

var pictureSource; // picture source
var destinationType; // sets the format of returned value

var avshell = {

  initialize: function() {
    this.bindEvents();

    //Cookies.set('ismob', '1', { expires: 365, path: '/', domain: 'cl.dzcl.pw' });
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  //只有真机才会有效果，模拟器没有
  onDeviceReady: function() {

    try {
      if (window.device.version.substr(0, 1) === '7') {
        //$('body').addClass('ios7');
      }
    } catch (e) {};

    avshell.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    $(".loading").remove();
    //
    window.umappkey = '560780dae0f55aecb200abf1'; //设置来自友盟的APPKEY,请从友盟网站申请http://www.umeng.com
    //login
    $("#loginBtn").click(function() {
      $("#loginInfo").html('');
      $.fn.umshare.login('sina', function(user) {
        $.fn.umshare.tip('登录成功,token:' + user.token + ', uid:' + user.uid);
        $("#loginInfo").html('登录成功,token:' + user.token + ', uid:' + user.uid);
      });
    });

    //getToken
    $("#getTokenBtn").click(function() {
      var info = $.fn.umshare.getToken("sina");
      $("#getTokenInfo").html(info ? 'token:' + info.token + ', uid:' + info.uid : 'false');
    });

    //checkToken
    $("#checkTokenBtn").click(function() {
      $("#checkTokenInfo").html('');
      $.fn.umshare.checkToken('sina', function(user) {
        $.fn.umshare.tip('登录成功,token:' + user.token + ', uid:' + user.uid);
        $("#checkTokenInfo").html('登录成功,token:' + user.token + ', uid:' + user.uid);
      });
    });

    //delToken
    $("#delTokenBtn").click(function() {
      var info = $.fn.umshare.delToken("sina");
      $("#delTokenInfo").html('退出成功');
    });

    //umshare
    var opt = {
      'data': {
        'content': {
          'text': '友盟分享组件帮您接入和升级微博、微信等社交平台，快速武装您的应用！',
          'img': 'img/share.png'
        }
      }
    }
    $("#shareBtn").umshare(opt);

    //share to some platform
    var opt = {
      'data': {
        'content': {
          'text': '友盟分享组件帮您接入和升级微博、微信等社交平台，快速武装您的应用！',
          'img': 'img/share.png'
        }
      }
    }
    $("#shareToSinaBtn").click(function() {
      $.fn.umshare.share('sina', opt);
    });

    //share to some platform(no edit page)
    var opt = {
      'data': {
        'content': {
          'text': '友盟分享组件帮您接入和升级微博、微信等社交平台，快速武装您的应用！',
          'img': 'img/share.png'
        }
      }
    }
    $("#shareSubmitSinaBtn").click(function() {
      $.fn.umshare.shareSubmit('sina', opt);
    });

    //shake
    $("#shakeBtn").click(function() {
      var shake = function() {
        var params = {};
        $.fn.umshare.shake(params, function() {
          $.fn.umshare.screenshot({}, function(url) {
            var opt = {
              'data': {
                'content': {
                  'text': '友盟分享组件帮您接入和升级微博、微信等社交平台，快速武装您的应用！',
                  'img': url
                }
              },
              'callback': function() {
                shake();
              }
            }
            $.fn.umshare.share('sina', opt);
          });
        });
      }
      shake();
    });

    //shake screenshot
    $("#screenshotBtn").click(function() {
      $.fn.umshare.screenshot({}, function(url) {
        var opt = {
          'data': {
            'content': {
              'text': '友盟分享组件帮您接入和升级微博、微信等社交平台，快速武装您的应用！',
              'img': url
            }
          }
        }
        $.fn.umshare.share('sina', opt);
      });
    });
  },


  /**
   * 去掉html中的标签、多余的空白等
   */
  removeHTMLTag: function(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    //str = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;").replace(/'/g, "&#039;"); //引号处理（标题有引号会导致 click 事件的参数出错）
    str = str.replace(/[&nbsp;|&amp;|&gt;|&lt;]/ig, ''); //去掉&nbsp; 一些剩余的转义后的大于号小于号
    return str;
  },


  /**
   * 请求一个html ，然后根据需要转换编码。最后在“列表”或“详情”等页面对 html 进行处理并显示
   * 
   * @param string file 网页 url 或 file 路径
   * @param string encoding 网页编码-如果是 gbk 需要转换
   * @param pageName string 操作标记-区分是哪个页面
   */
  fetchAndDecode: function(file, encoding, pageName, pageTitle) {

    //alert(file);

    //         var xhr = new XMLHttpRequest();  
    //         xhr.open('GET', file);  
    //         xhr.responseType = 'arraybuffer';  
    //         xhr.onload = function() {  
    //           if (this.status == 200) {  
    //             var dataView = new DataView(this.response);  
    //             var decoder = new TextDecoder(encoding);  
    //             var decodedString = decoder.decode(dataView); 
    // alert(pageName + "," + file);
    //             if('threadList' == pageName){
    //                 // 列表页
    //                 $(decodedString).find(".tr3 h3").each(function(index, el) {
    //                   var element = $(el).find("a");

    //                   var link = element.attr("href");

    //                   // 浏览器测试模式,使用一个本地文件
    //                   if('browser' == devicemode){
    //                     link = baseurl + threadDetailUrl;
    //                   }

    //                   //动态创建的 html 中，ng-click 无效（onclick有效），因此

    //                   var title = element.html().replace(/<[span|font|br][^>]+>/g,"");
    //                   str = "<li class='item'><a onclick='avshell.set_thread_detail_link(\"" + link + "\");' href='#/tab/threads/1'>" + title + "</a></li>"
    //                   $("#thread-list").append(str);
    //                 });
    //             }else if('threadDetail' == pageName){
    //                 // 详情页
    //                 $(decodedString).find("table table td .tpc_content").first().each(function(index, el) {
    //                   $(el).find("img").removeAttr('onclick').removeAttr('style').wrap("<p></p>");
    //                   str = $(el).html().replace(/<[span|font|br][^>]+>/g,"");
    //                   $("#thread-detail").append(str);
    //                 });
    //             }


    //           } else {  
    //             alert("error")
    //             console.error('Error while requesting', file, this);  
    //           }  
    //         };  
    //         xhr.send();  



    // jQuery
    // 支持 arrayBuffer https://gist.github.com/SaneMethod/7548768
    // 实体设备不支持 arraybuffer 方式的请求(本地文件，GBK编码要进行转码处理)

    // 因为放在公共函数中，angular 先与这个含有回调的网络请求执行，会导致 localStorge 后写入的数据无法被 $scope.xxx 读取出来

    // 所以还是放入 Controller 里去，读取数据后用 ng-repeat 显示，也方便绑定 ng-click

    $.ajax({
      type: "GET",
      url: file,
      data: "",
      //dataType: 'arraybuffer',
      success: function(response) {

        // var dataView = new DataView(response);
        // var decoder = new TextDecoder(encoding);
        // var decodedString = decoder.decode(dataView);

        decodedString = response;

        if ('threadList' == pageName) {
          // 列表页
          $(decodedString).find(".tr3 h3").each(function(index, el) {
            element = $(el).find("a");

            link = baseurl + "/" + element.attr("href");

            // // 浏览器测试模式,使用一个本地文件
            // if ('browser' == devicemode) {
            //   link = baseurl + threadDetailUrl;
            // }

            //动态创建的 html 中，ng-click 无效（onclick有效），因此

            title = element.html().replace(/<[span|font|br][^>]+>/g, "");
            str = "<li class='item'><a onclick='avshell.gotoThreadDetail(\"" + link + "\",\"" + title + "\");' href='#/tab/threadDetail'>" + title + "</a></li>"
            $("#thread-list").append(str);
            str = null;

          });
        } else if ('threadDetail' == pageName) {
          // 详情页
          $(decodedString).find("table table td .tpc_content").first().each(function(index, el) {
            $(el).find("img").removeAttr('onclick').removeAttr('style').wrap("<p></p>");
            str = $(el).html().replace(/<[span|font][^>]+>/g, "");
            $("#thread-detail").append(str);
            str = null;

          });
        }

        $(".title").html(pageTitle);

        decodedString = null;
      }
    });



    // $http({method: 'GET', url: baseurl + threadListUrl, responseType: "arraybuffer"}).
    // success(function(data, status, headers, config) {
    //   var dataView = new DataView(data);  
    //   var decoder = new TextDecoder('gbk');  
    //   var decodedString = decoder.decode(dataView); 

    //   if('threadList' == pageName){
    //       // 列表页
    //       $(decodedString).find(".tr3 h3").each(function(index, el) {
    //         var element = $(el).find("a");

    //         var link = element.attr("href");

    //         // 浏览器测试模式,使用一个本地文件
    //         if('browser' == devicemode){
    //           link = baseurl + threadDetailUrl;
    //         }

    //         //动态创建的 html 中，ng-click 无效（onclick有效），因此

    //         var title = element.html().replace(/<[span|font|br][^>]+>/g,"");
    //         str = "<li class='item'><a onclick='avshell.set_thread_detail_link(\"" + link + "\");' href='#/tab/threads/1'>" + title + "</a></li>"
    //         $("#thread-list").append(str);
    //       });
    //   }else if('threadDetail' == pageName){
    //       // 详情页
    //       $(decodedString).find("table table td .tpc_content").first().each(function(index, el) {
    //         $(el).find("img").removeAttr('onclick').removeAttr('style').wrap("<p></p>");
    //         str = $(el).html().replace(/<[span|font|br][^>]+>/g,"");
    //         $("#thread-detail").append(str);
    //       });
    //   }
    // }).
    // error(function(data, status, headers, config) {
    //   // called asynchronously if an error occurs
    //   // or server returns response with an error status.
    // });


  },

  /**
   * 在帖子列表页加载数据，把 url 存储到临时变量
   * 
   * @param string link 网页 url 或 file 路径
   */
  gotoThreadList: function(link, forumTitle) {
    window.localStorage['thread_list_link'] = link;
    window.localStorage['thread_list_forumTitle'] = forumTitle;

    avshell.fetchAndDecode(link, "gbk", "threadList", forumTitle);
  },


  /**
   * 在帖子详情页加载数据，把 url 存储到临时变量
   * 
   * @param string link 网页 url 或 file 路径
   */
  gotoThreadDetail: function(link, threadTitle) {
    window.localStorage['thread_detail_link'] = link;
    window.localStorage['thread_detail_threadTitle'] = threadTitle;

    avshell.fetchAndDecode(link, "gbk", "threadDetail", threadTitle);
  }

};
