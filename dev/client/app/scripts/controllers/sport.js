'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SportCtrl', ['$scope', 'DataFactory', function ($scope, DataFactory) {
    console.log(DataFactory.get())
  }]);
