'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('LogoutCtrl', function ($location, user) {
    user.logout();
    $location.path('/login');
  });
