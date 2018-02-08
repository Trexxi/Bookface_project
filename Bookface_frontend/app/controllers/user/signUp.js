'use strict';

angular.module('myApp.signUp', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signUp', {
            templateUrl: '../../views/user/signUp.html',
            controller: 'SignUpCtrl'
        });
    }])

    .controller('SignUpCtrl', ['$scope', '$http','$location','$rootScope', function ($scope, $http, $location, $rootScope) {
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


        $scope.fieldsAreEmpty = function() {
            if(typeof $scope.name !== "undefined"&&
                typeof $scope.email !== "undefined"&&
                typeof $scope.username !== "undefined"&&
                typeof $scope.password !== "undefined") {
                return false
            } else {
                return true;
            }
        };


        $scope.signUp = function() {
            if(!$scope.fieldsAreEmpty()) {
                if($scope.password === $scope.password2) {
                    var data = {
                        name: $scope.name.toString(),
                        email: $scope.email.toString(),
                        username: $scope.username.toString(),
                        password: $scope.password.toString()
                    };
                    $http.post('http://localhost:3000/users/createUser', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                        .success(function (data, status, headers, config) {
                            $location.path('/login');
                        })
                        .error(function (data, status, header, config) {
                            console.log("Status: ", status);
                            //ERROR HANDLE
                        });
                } else {
                    $scope.error ="Passwords must match";
                }

            } else {
                $scope.error = "You must fill all fields or email is not valid";
            }

        };
    }]);