'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('LoginCtrl', function ($location, user) {
    this.loginError = null;
    this.createUserError = null;

    this.login = function() {
      var result = user.login(this.username, this.password);
      if (result) {
        $location.path('/');
      } else {
        this.loginError = 'Invalid username or password';
      }
    };

    this.createUser = function() {
      var result = user.addUser(this.newUsername, this.newPassword);
      if (result) {
        $location.path('/');
      } else {
        this.createUserError = 'Couldn\'t create account. Please ensure username and password are at least 6 characters long and that the username isn\'t already in use';
      }
    };
  });
