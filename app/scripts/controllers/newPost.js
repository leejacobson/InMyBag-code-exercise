'use strict';

/**
 * @ngdoc function
 * @name inmybagApp.controller:NewPostCtrl
 * @description
 * # NewPostCtrl
 * Controller of the inmybagApp
 */
angular.module('inmybagApp')
  .controller('NewPostCtrl', function ($scope, $location, blog) {
    this.title = '';
    this.content = '';
    this.categories = blog.getCategories();
    this.category = this.categories[0];
    this.coverImage = null;

    this.save = function() {
      blog.newPost({
        title: this.title,
        content: this.content,
        category: this.category,
        coverImage: this.coverImage
      });
      $location.path('/');
    };
    
    this.initCoverImageUpload = function() {
      angular.element('#post-cover-image-input').trigger('click');
    };

    this.addingCategory = false;
    this.showAddCategory = function() {
      this.addingCategory = true;
    };

    this.addCategory = function(category) {
      this.categories.push(category);
      this.category = category;
      this.addingCategory = false;
    };
  })
  .directive('fileReader', function($q) {
    var slice = Array.prototype.slice;

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) {
          return;
        }

        ngModel.$render = function() {};

        element.bind('change', function(e) {
          var element = e.target;

          function readFile(file) {
            var deferred = $q.defer();
            
            if (file.size / 1000000 > 1) {
              deferred.reject('Please select image under 1MB');
            }

            var reader = new FileReader();
            reader.onload = function(e) {
              deferred.resolve(e.target.result);
            };
            reader.onerror = function(e) {
              deferred.reject(e);
            };
            reader.readAsDataURL(file);

            return deferred.promise;
          }
          
          $q.all(slice.call(element.files, 0).map(readFile))
          .then(function(values) {
            if (element.multiple) {
              ngModel.$setViewValue(values);
            } else {
              ngModel.$setViewValue(values.length ? values[0] : null);
            }
          }, function(err) {
            window.alert(err);
          });
        });
      }
    };
  });
