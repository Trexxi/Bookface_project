'use strict';

angular.module('myApp.imageTest', ['ngRoute', 'oitozero.ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/test', {
            templateUrl: '../../views/imageTest.html',
            controller: 'ImageTestCtrl'
        });
    }])

    .controller('ImageTestCtrl', ['$scope', '$http','$location','$rootScope','SweetAlert', function ($scope, $http, $location, $rootScope, SweetAlert, fileReader) {
        $scope.imageSrc = "";

        $scope.$on("fileProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
        function serializeData(data) {
            // If this is not an object, defer to native stringification.
            if (!angular.isObject(data)) {
                return ((data == null) ? "" : data.toString());
            }

            var buffer = [];

            // Serialize each key in the object.
            for (var name in data) {
                if (!data.hasOwnProperty(name)) {
                    continue;
                }

                var value = data[name];

                buffer.push(
                    encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value)
                );
            }

            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            // Serialize the buffer and clean it up for transportation.
            var source = buffer.join("&").replace(/%20/g, "+");
            return (source);
        }
        $scope.saveImage = function() {
            var data = {
                token: sessionStorage.token,
                imageBinary: $scope.imageSrc
            };
            $http.post('http://localhost:3000/users/uploadImage', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function (data, status, headers, config) {
                    console.log(headers());
                    console.log(data);
                    console.log(config);
                    console.log($cookies);
                    $location.path('/cards');
                })
                .error(function (data, status, header, config) {
                    console.log("Status: ", status);
                    if (status === 401) {
                        $scope.error = 'User/password combination not found in the database';
                    } else {
                        //TODO:(BUG) sometimes triggers when there's no application error
                        $scope.error = 'Application problem, please let us know';
                    }
                });
        };
    }]);