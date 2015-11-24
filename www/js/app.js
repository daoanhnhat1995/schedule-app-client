angular.module('parse-starter', ['ionic','ngResource','ionic-material','parse-starter.controllers', 'parse-starter.factories'])
  .config(function ($urlRouterProvider, $stateProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $urlRouterProvider.otherwise('main/dashboard');
    $stateProvider
      .state('main', {
      	url: '/main',
      	cache: false,
      	templateUrl: 'templates/side-menu.html',
      	abstract: true
      })
      .state('main.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
           }
        }
      })
      .state('main.block-time-edit',{
        url: '/blocktimes/edit',
        views:{
          'menuContent':{
            templateUrl:'templates/blocktimes/edit.html',
            controller: 'editBlockTimeCtrl'
          }
        }
      })
      .state('main.course-list',{
        url: '/course/index',
        views:{
          'menuContent':{
            templateUrl:'templates/courses/index.html',
            controller: 'courseListCtrl'
          }
        }
      })
      .state('main.edit-course',{
        url: '/course/edit',
        views:{
          'menuContent':{
            templateUrl: 'templates/courses/edit.html',
            controller: 'editCourseCtrl'
          }
        }
      })
      .state('main.block-time-index',{
        url:'/blocktimes/index',
        views:
        {
          'menuContent':{
            templateUrl:'templates/blocktimes/index.html',
            controller:'mainBlockTimeCtrl'
          }
        }
      })
      .state('main.dashboard',{
        url:'/dashboard',
        views:{
          'menuContent':{
            templateUrl:'templates/dashboard.html'
          }
        }
      })
      .state('main.my-schedule',{
        url:'/schedule/my-schedule',
        views:{
          'menuContent':{
            templateUrl: 'templates/schedule/detail-view.html',
            controller: 'myScheduleCtrl'
          }
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/authentication/signup.html',
        controller: 'SignupCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/authentication/login.html',
        controller: 'LoginCtrl'
      })
      .state('reset', {
        url: '/reset',
        templateUrl: 'templates/authentication/reset.html',
        controller: 'ResetCtrl'
      })
      .state('main.generate-schedule',{
        url: '/generate',
        views:{
          'menuContent':{
        templateUrl: 'templates/schedule/generate.html',
        controller:'GenerateCtrl'
      }
      }
      })

  })
  .run(function ($ionicPlatform, $state) {

    // params[application_id, javascript_key]
    Parse.initialize("maP05W7Q8wmbpr7JI7lPMzv9ZCq2LsPwSTm2yB6D", "lLCbV1F8fGFeNLjlKJCEbwweRhc8DWijylFXyEZq");

    //Todo
    //window.fbAsyncInit = function () {
    //  Parse.FacebookUtils.init({ // this line replaces FB.init({
    //    appId: 'FB_APP_ID', // Facebook App ID
    //    //   status: true,  // check Facebook Login status
    //    cookie: true,  // enable cookies to allow Parse to access the session
    //    xfbml: true,  // initialize Facebook social plugins on the page
    //    version: 'v2.2' // point to the latest Facebook Graph API version
    //  });
    //
    //};
    //
    //(function (d, s, id) {
    //  var js, fjs = d.getElementsByTagName(s)[0];
    //  if (d.getElementById(id)) {
    //    return;
    //  }
    //  js = d.createElement(s);
    //  js.id = id;
    //  js.src = "https://connect.facebook.net/en_US/sdk.js";
    //  fjs.parentNode.insertBefore(js, fjs);
    //}(document, 'script', 'facebook-jssdk'));

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      // if (Parse.User.current()) {
      //   $state.go('home')

      // }
    });
  });
