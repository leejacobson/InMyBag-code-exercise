'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('MainCtrl', function (blog) {
    this.posts = blog.getAll();
  })
  .directive('blogPostCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/blogPostCard.html',
    };
  });
