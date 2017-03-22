'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:ViewPostCtrl
 * @description
 * # ViewPostCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('ViewPostCtrl', function ($routeParams, $location, blog, user) {
    this.postId = $routeParams.postId;

    this.post = blog.getPost(this.postId);
    
    this.user = user.getUser(this.post.user);

    this.delete = function() {
      blog.deletePost(this.postId);
      $location.path('/');
    };
  });
