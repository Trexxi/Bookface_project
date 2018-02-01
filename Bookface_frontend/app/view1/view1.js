'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http',function($scope, $http) {
    $http({
        method: 'GET',
        url: "http://localhost:3000/users"
    }).success(function(data) {
    console.log(data);
  }).error(function(error){
    console.log(error);
  });
}]);