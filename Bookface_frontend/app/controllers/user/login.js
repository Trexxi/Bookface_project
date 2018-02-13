'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '../../views/user/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$http','$location','$rootScope','$cookies','$browser', function ($scope, $http, $location, $rootScope, $cookies, $browser) {
        $scope.init = function() {
          $scope.validateLogin();
        };

        $scope.validateLogin = function() {
            if(typeof sessionStorage.token !== "undefined") {
                $location.path('/cards');
            }
        };

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
        $scope.username = "beckman97";
        $scope.password = "hehe123";
        $scope.login = function() {

            console.log($scope.username, $scope.password);
            var fieldsAreEmpty = function() {
                if(typeof $scope.username !== "undefined" && typeof $scope.password !== "undefined") {
                    return false
                } else {
                    return true
                }
            };
            if(!fieldsAreEmpty()) {
                var data = {
                    username: $scope.username.toString(),
                    password:  $scope.password.toString()
                };
                $http.post('http://localhost:3000/users/login', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .success(function (data, status, headers, config) {
                        sessionStorage.token = data.token;
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
            } else {
                $scope.error = 'Please enter the fields';
            }
        };
    }]);