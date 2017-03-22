'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:CategoryPostsCtrl
 * @description
 * # CategoryPostsCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('CategoryPostsCtrl', function ($routeParams, blog) {
    this.posts = blog.getAll();
    this.category = $routeParams.category;
    
    var self = this;
    this.categoryPosts = this.posts.filter(function(post) {
      return (post.category === self.category);
    });
  });
