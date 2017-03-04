'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['firebase',
  'ngRoute',
  'ngMaterial',
  'myApp.home',
  'myApp.version'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/'});
}]);