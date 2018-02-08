'use strict';

angular.module('myApp.logout', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: '../../views/user/logout.html',
            controller: 'LogoutCtrl'
        });
    }])

    .controller('LogoutCtrl', ['$scope', '$http','$location','$rootScope','$cookies', function ($scope, $http, $location, $rootScope, $cookies) {

        $cookies.remove('connect.sid');
        delete sessionStorage.token;
        $location.path('/login');
    }]);