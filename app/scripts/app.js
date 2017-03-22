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
      var posts = localStorageService.get('posts');
      if (!posts) {
        posts = [];
      }
      return posts;
    };
    blogObj.newPost = function(post) {
      var posts = blogObj.getAll();
      var postId = posts.length > 0 ? posts[posts.length-1].id + 1 : 1;
      post.id = postId;
      posts.push(post);
      localStorageService.set('posts', posts);
      blogObj.addCategory(post.category);
      
      return postId;
    };
    blogObj.getPost = function(postId) {
      var posts = blogObj.getAll();
      return posts.find(function(post) {
        return parseInt(postId) === post.id;
      });
    };
    blogObj.deletePost = function(postId) {
      var posts = blogObj.getAll();
      var postIndex = posts.findIndex(function(post) {
        return parseInt(postId) === post.id;
      });
      if (postIndex > -1) {
        posts.splice(postIndex, 1);
      }
      localStorageService.set('posts', posts);
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