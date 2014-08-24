'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl'
        })
        .when('/Soccer', {
            templateUrl: 'views/sport.html',
            controller: 'SportCtrl'
        })
        .when('/Football', {
            templateUrl: 'views/sport.html',
            controller: 'SportCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });

  }])

.factory('DataFactory', ['$http', function($http) {
    return {
        // call to get all nerds
        get : function() {
            return $http.get('http://localhost:3030/api/bears');
        },

        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        }

        // call to DELETE a nerd
        //delete : function(id) {
        //    return $http.delete('/api/nerds/' + id);
        //}
    }

}])


    .service('fullData',[function(){
        return sportsData;
    }])
    .controller('appMainCtrl',['$scope','fullData', function($scope,fullData){
        $scope.data = fullData;
        $scope.league = 0;
        $scope.conference = 0;
        $scope.division = 0;
        $scope.team = 0;
        $scope.sport = null;

        $scope.selectSport = function (sport){
            $scope.team = 0;
            $scope.league = 0;
            $scope.player = 0;
            $scope.sport = sport;
        };

        $scope.selectLeague = function (league){
            $scope.team = 0;
            $scope.player = 0;
            $scope.league = league;
        };

        $scope.selectTeam = function (team){
            $scope.player = 0;
            $scope.team = team;
        };

}]);