'use strict';

/**
 * @ngdoc overview
 * @name inmybagApp.factory:user
 * @description
 * # inmybagApp
 *
 * User service
 */
angular.module('inmybagApp')
 .factory('user', function (localStorageService) {
    var userObj = {};
    
    userObj.loggedIn = function() {
      var userId = localStorageService.get('loggedIn');
      if (userId) {
        return userId;
      } else {
        return 0;
      }
    };
    
    userObj.logout = function() {
      localStorageService.set('loggedIn', 0);
    };
    
    userObj.getAll = function() {
      var users = localStorageService.get('users');
      if (!users) {
        users = [];
      }
      return users;
    };

    userObj.addUser = function(username, password) {
      if (username.length < 6 || password.length < 6) {
        return false;
      }
      
      var users = this.getAll();
      var existingUser = users.find(function(user) {
        return user.username === username;
      });
      
      if (existingUser) {
        return false;
      }

      var userId = users.length > 0 ? users[users.length-1].id + 1 : 1;
      var user = {
        id: userId,
        username: username,
        password: password
      };
      users.push(user);
      localStorageService.set('users', users);
      localStorageService.set('loggedIn', user.id);
      return true;
    };

    userObj.login = function(username, password) {
      var users = this.getAll();
      var user = users.find(function(user) {
        return user.username === username;
      });
      if (user) {
        if (user.password === password) {
          localStorageService.set('loggedIn', user.id);
          return true;
        }
      }
      return false;
    };
    
    userObj.getUser = function(userId) {
      var users = this.getAll();
      var user = users.find(function(user) {
        return user.id === userId;
      });
      return user;
    };

    return userObj;
  });