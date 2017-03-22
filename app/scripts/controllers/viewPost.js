'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:ViewPostCtrl
 * @description
 * # ViewPostCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('ViewPostCtrl', function ($routeParams, blog) {
    this.postId = $routeParams.postId;
    this.posts = blog.getAll();
    this.post = this.posts[this.postId];
  });
