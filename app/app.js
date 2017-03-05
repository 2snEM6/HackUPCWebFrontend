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
}])

.controller('chatController', function($scope, $http, $firebaseArray){
    $scope.emergencyID = '';
    $scope.userID = 'v45CvHqfffg7Cm6MoteUKwfd8jr1';

    $scope.setEmergency = function(item) {
        console.log(item)
        $scope.emergencyID = item["key"]
    }


    var ref = firebase.database().ref("emergencyMessages/" + $scope.emergencyID);



    var Message = {
        all: $firebaseArray(ref.orderByChild("_timestamp")),
        create: function (message) {
        },
        delete: function (message) {
            return messages.$remove(message);
        }
    };

    $scope.user="Guest";

    $scope.messages= Message.all;

    $scope.insert = function(message){
      console.log("SOMEETHING");
        var newMessage = {
          type: "text",
            content: message.text
        };
        console.log(JSON.stringify(newMessage));
        /*$http({
            method: 'POST',
            url: 'https://alifeapi.herokuapp.com/users/'+ userID +'/emergencies/'+emergencyID+'/messages',
            data:  JSON.stringify(newMessage),
            headers: {'Content-Type': 'application/json'}
        })*/
        $http.post('https://alifeapidev.herokuapp.com/users/'+ $scope.userID +'/emergencies/'+ $scope.emergencyID+'/messages', JSON.stringify(newMessage))
            .then(function (response) {
                if (response.data)
                    console.log("Post Data Submitted Successfully!");
            }, function (response) {
                console.log("Service not Exists");
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers());
            });
    };
});