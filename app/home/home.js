'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    }).when('/high', {
        templateUrl: 'home/high.html',
        controller: 'HomeCtrl'
    }).when('/medium', {
        templateUrl: 'home/medium.html',
        controller: 'HomeCtrl'
    }).when('/low', {
        templateUrl: 'home/low.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', function($scope, $firebaseArray) {

    $scope.currentNavItem = 'high';

    var ref = firebase.database().ref("emergencies");
    $scope.emergencies = $firebaseArray(ref);

    $scope.emergencies.forEach(function (item) {
        if (item.type == 2) {

        } else if (item.type == 1) {

        } else if (item.type == 0) {

        }
    });

    console.log($scope.emergencies);


});

