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

    var ref = firebase.database().ref().child("emergencies");
    $scope.emergencies = $firebaseArray(ref);

});

