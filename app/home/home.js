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

})

.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();

        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});




