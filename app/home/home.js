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
    var queryLowEmergencies = ref.orderByChild("type").equalTo(0);
    var queryMediumEmergencies = ref.orderByChild("type").equalTo(1);
    var queryHighEmergencies = ref.orderByChild("type").equalTo(2);

    $scope.lowEmergencies = $firebaseArray(queryLowEmergencies);
    $scope.mediumEmergencies = $firebaseArray(queryMediumEmergencies);
    $scope.highEmergencies = $firebaseArray(queryHighEmergencies);

});

