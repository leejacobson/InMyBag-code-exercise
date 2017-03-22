'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:TemplateCtrl
 * @description
 * # TemplateCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('TemplateCtrl', function ($scope, user) {
    this.loggedIn = user.loggedIn();
    var self = this;
    $scope.$watch(function() { 
        return user.loggedIn();
      },
      function(userId) {
        self.loggedIn = userId;
        console.log(userId);
      }
    );
  });
