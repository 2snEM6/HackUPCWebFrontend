'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'index.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', function($scope, $firebaseArray) {

    $scope.selectedIndexDefault = 0;

    var refEmergencies = firebase.database().ref("emergencies");
    $scope.allEmergencies = $firebaseArray(refEmergencies);

    $scope.getHighEmergencies = function() {
        var queryHighEmergencies = refEmergencies.orderByChild("type").equalTo(2);
        $scope.highEmergencies = $firebaseArray(queryHighEmergencies);
    };

    $scope.getMediumEmergencies = function() {
        var queryMediumEmergencies = refEmergencies.orderByChild("type").equalTo(1);
        $scope.mediumEmergencies = $firebaseArray(queryMediumEmergencies);
    };

    $scope.getLowEmergencies = function() {
        var queryLowEmergencies = refEmergencies.orderByChild("type").equalTo(0);
        $scope.lowEmergencies = $firebaseArray(queryLowEmergencies);
    };

    $scope.paintMarkInMap = function(latitude, longitude) {

        var position = {lat: latitude, lng: longitude};

        var marker = new google.maps.Marker({
            position: position,
            map: map
        });

        markers.push(marker);
    };

    $scope.date = new Date();


});


