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
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('blog', function (localStorageService) {
    var blogObj = {};
    blogObj.getAll = function() {
      var blogs = localStorageService.get('blogs');
      if (!blogs) {
        blogs = [];
      }
      return blogs;
    };
    blogObj.newPost = function(post) {
      var blogs = blogObj.getAll();
      var postId = blogs.length > 0 ? blogs[blogs.length-1].id + 1 : 1;
      post.id = postId;
      blogs.push(post);
      localStorageService.set('blogs', blogs);
      blogObj.addCategory(post.category);
    };
    blogObj.getCategories = function() {
      var categories = localStorageService.get('blogCategories');
      if (!categories) {
        categories = ['default'];
      }
      return categories;
    };
    blogObj.addCategory = function(category) {
      var categories = blogObj.getCategories();
      if (categories.indexOf(category) >= 0) {
        return;
      }
      categories.push(category);
      localStorageService.set('blogCategories', categories);
    };

    return blogObj;
  })
  .directive('blogPostCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/blogPostCard.html',
    };
  });