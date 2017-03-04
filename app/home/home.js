'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'index.html',
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

    var allEmergencies = $firebaseArray(ref);
    console.log(allEmergencies);

    allEmergencies.forEach(function (item) {
        var pos = {
            lat: item.location.latitude,
            lng: item.location.longitude
        };

        var marker = new google.maps.Marker({
            position: pos,
            map: map
        });
    });

});


