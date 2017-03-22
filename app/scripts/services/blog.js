'use strict';

/**
 * @ngdoc overview
 * @name inmybagApp.factory:blog
 * @description
 * # inmybagApp
 *
 * Blog service
 */
angular.module('inmybagApp')
 .factory('blog', function (localStorageService, user) {
    var blogObj = {};
    blogObj.getAll = function() {
      var posts = localStorageService.get('posts');
      if (!posts) {
        posts = [];
      }
      return posts;
    };
    blogObj.newPost = function(post) {
      var posts = this.getAll();
      var postId = posts.length > 0 ? posts[posts.length-1].id + 1 : 1;
      post.id = postId;
      
      var userId = user.loggedIn();
      post.user = userId;
      
      posts.push(post);
      localStorageService.set('posts', posts);
      this.addCategory(post.category);
      
      return postId;
    };
    blogObj.getPost = function(postId) {
      var posts = this.getAll();
      return posts.find(function(post) {
        return parseInt(postId) === post.id;
      });
    };
    blogObj.deletePost = function(postId) {
      var posts = this.getAll();
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
      var categories = this.getCategories();
      if (categories.indexOf(category) >= 0) {
        return;
      }
      categories.push(category);
      localStorageService.set('blogCategories', categories);
    };

    return blogObj;
  });