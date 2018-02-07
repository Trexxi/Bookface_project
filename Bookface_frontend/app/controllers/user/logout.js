'use strict';

angular.module('myApp.logout', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: '../../views/user/logout.html',
            controller: 'LogoutCtrl'
        });
    }])

    .controller('LogoutCtrl', ['$scope', '$http','$location','$rootScope', function ($scope, $http, $location, $rootScope) {
        $rootScope.token = null;
        $location.path('/login');
    }]);