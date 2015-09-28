angular.module('avshell.services', [])
  .factory('Forums', function() {

    var init_forums = [{
      url: '',
      title: 'BT電影下載',
      description: '',
      icon:'',
      isItemDivider: 'item-divider'
    },{
      url: 'thread0806.php?fid=2',
      title: '亞洲無碼原創區',
      description: '自由發布亞洲最新無修正資訊片 亞洲無碼AV大聯盟',
      icon:''
    }, {
      url: 'thread0806.php?fid=15',
      title: '亞洲有碼原創區',
      description: '自由發布亞洲最新有修正資訊片 以及三級等其他資訊片',
      icon:''
    }, {
      url: 'thread0806.php?fid=4',
      title: '歐美原創區',
      description: '自由發布純正的歐美成人資訊片',
      icon:''
    }, {
      url: 'thread0806.php?fid=5',
      title: '動漫原創區',
      description: '自由發布任何H動畫漫畫',
      icon:''
    }, {
      url: 'thread0806.php?fid=21',
      title: 'HTTP下載區',
      description: '自由發布各類HTTP/Ray/eMule等方式下載',
      icon:''
    }, {
      url: 'thread0806.php?fid=22',
      title: '在綫成人影院',
      description: '在綫欣賞,即點即看',
      icon:''
    }, {
      url: 'thread0806.php?fid=10',
      title: '草榴影視庫',
      description: '發布2-3個月后的帖子,會轉移到這里,保留一段時間后,刪除(會員可看)',
      icon:''
    }, {
      url: '',
      title: '草榴休閑區',
      description: '',
      icon:'',
      isItemDivider: 'item-divider'
    }, {
      url: 'thread0806.php?fid=7',
      title: '技術討論區',
      description: '日常生活 興趣交流 時事經濟 求助求檔 會員閑談吹水區',
      icon:''
    }, {
      url: 'thread0806.php?fid=8',
      title: '新時代的我們',
      description: '草榴貼圖區 加大你的帶寬! 加大你的內存! 加大你的顯示器!',
      icon:''
    }, {
      url: 'thread0806.php?fid=16',
      title: '達蓋爾的旗幟',
      description: '草榴自拍區 分享你我光圈下的最美',
      icon:''
    }, {
      url: 'thread0806.php?fid=20',
      title: '成人文學交流區',
      description: '草榴文學區 歡迎各位發表',
      icon:''
    }, {
      url: 'thread0806.php?fid=9',
      title: '草榴資訊',
      description: '公告有關本站最新動向 會員須知 請經常來看看',
      icon:''
    }];


    //获取所有类别
    var getForums = function() {
      var forumsString = window.localStorage['forums'];
      if (forumsString) {
        var forums = angular.fromJson(forumsString);

        return forums;
      }

      return init_forums;
    }

    return {
      all: getForums
    };

  })

.factory('Threads', function() {
  
  var threads = [];

  return {
    all: function() {
      return threads;
    }
  };
});
