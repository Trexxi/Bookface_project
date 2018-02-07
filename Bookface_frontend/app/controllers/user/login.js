'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '../../views/user/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$http','$location','$rootScope', function ($scope, $http, $location, $rootScope) {
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

        $scope.init = function() {
          $scope.validateLogin();
        };

        $scope.validateLogin = function() {
            if(typeof $rootScope.token === "string") {
                $location.path('/cards');
            }
        };

        $scope.login = function() {

            console.log($scope.username, $scope.password);
            if(typeof $scope.username !== "undefined" && typeof $scope.password !== "undefined") {
                var data = {
                    username: $scope.username.toString(),
                    password: $scope.password.toString()
                };
                $http.post('http://localhost:3000/users/login', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .success(function (data, status, headers, config) {
                        $rootScope.token = data.token;
                        $location.path('/cards');
                    })
                    .error(function (data, status, header, config) {
                        console.log("Status: ", status);
                        if (status === 401) {
                            $scope.error = 'User/password combination not found in the database';
                        } else {
                            $scope.error = 'Application problem, please let us know';
                        }
                    });
            } else {
                $scope.error = 'Please enter the fields';
            }
        };
    }]);