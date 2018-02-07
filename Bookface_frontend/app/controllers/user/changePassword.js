'use strict';

angular.module('myApp.changePassword', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/changePassword', {
            templateUrl: '../../views/user/changePassword.html',
            controller: 'ChangePasswordCtrl'
        });
    }])

    .controller('ChangePasswordCtrl', ['$scope', '$http','$location','$rootScope', function ($scope, $http, $location, $rootScope) {
        console.log("change password");
    }]);