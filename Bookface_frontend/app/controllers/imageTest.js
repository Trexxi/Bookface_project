'use strict';

angular.module('myApp.imageTest', ['ngRoute', 'oitozero.ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/test', {
            templateUrl: '../../views/imageTest.html',
            controller: 'ImageTestCtrl'
        });
    }])

    .controller('ImageTestCtrl', ['$scope', '$http','$location','$rootScope','SweetAlert', function ($scope, $http, $location, $rootScope, SweetAlert, fileReader       ) {
        $scope.imageSrc = "";

        $scope.$on("fileProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
    }]);