'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http',function($scope, $http) {
  console.log("JHEWHJIEQFEQFQE");
  var data = {
    hehe:"jhefqewfjiewofioewjfewoifwjefoewifewoifj"
  };
    $http({
        method: 'POST',
        url: 'http://localhost:3000/users/mj',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
}]);