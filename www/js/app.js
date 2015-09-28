window.devicemode = 'browser'; //app
window.baseurl = 'http://cl.dzcl.pw';
window.threadListUrl = '/thread0806.php?fid=7';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('avshell', ['ionic','ngCordova', 'ngSanitize', 'avshell.controllers', 'avshell.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        //devicemode = ( /(ios)/i.test(navigator.userAgent) ) ? 'app' : 'browser';
        var deviceInformation = ionic.Platform.device();

        var isWebView = ionic.Platform.isWebView();
        var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone();

        var currentPlatform = ionic.Platform.platform();
        var currentPlatformVersion = ionic.Platform.version();

        
        // if (!isIOS && !isAndroid) {
        //     devicemode = 'browser';
        //     baseurl = 'http://localhost:8100';
        //     threadListUrl = '/threadlist.html';
        //     threadDetailUrl = '/htm_data/7/1509/1637251.html';
        // }

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.forums', {
            url: '/forums',
            views: {
                'tab-main': {
                    templateUrl: 'templates/tab-forums.html',
                    controller: 'ForumsCtrl'
                }
            }
        })

        .state('tab.threadList', {
                url: '/threadList',
                cache: false,
                views: {
                    'tab-main': {
                        templateUrl: 'templates/tab-thread-list.html',
                        controller: 'ThreadListCtrl'
                    }
                }
            })
            .state('tab.threadDetail', {
                url: '/threadDetail',
                cache: false,
                views: {
                    'tab-main': {
                        templateUrl: 'templates/thread-detail.html',
                        controller: 'ThreadDetailCtrl'
                    }
                }
            })

    .state('tab.collect', {
        url: '/collect',
        views: {
            'tab-collect': {
                templateUrl: 'templates/tab-collect.html',
                controller: 'CollectCtrl'
            }
        }
    })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    //测试阶段，直接进入 抓图/抓磁力链 页面
    $urlRouterProvider.otherwise('/tab/forums');

}).config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
});
