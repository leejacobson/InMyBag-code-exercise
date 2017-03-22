'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:ViewPostCtrl
 * @description
 * # ViewPostCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('ViewPostCtrl', function ($routeParams, $location, blog) {
    this.postId = $routeParams.postId;

    this.post = blog.getPost(this.postId);
    
    this.delete = function() {
      blog.deletePost(this.postId);
      $location.path('/');
    };
  });
