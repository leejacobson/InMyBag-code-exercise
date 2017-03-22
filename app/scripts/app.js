'use strict';

/**
 * @ngdoc overview
 * @name inmybagApp
 * @description
 * # inmybagApp
 *
 * Main module of the application.
 */
angular
  .module('inmybagApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/new-post', {
        templateUrl: 'views/newPost.html',
        controller: 'NewPostCtrl',
        controllerAs: 'newPost'
      })
      .when('/post/:postId', {
        templateUrl: 'views/viewPost.html',
        controller: 'ViewPostCtrl',
        controllerAs: 'viewPost'
      })
      .when('/category/:category', {
        templateUrl: 'views/categoryPosts.html',
        controller: 'CategoryPostsCtrl',
        controllerAs: 'categoryPosts'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
      .when('/logout', {
        controller: 'LogoutCtrl',
        controllerAs: 'logoutCtrl',
        template: ''
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .directive('blogPostCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/blogPostCard.html',
    };
  });