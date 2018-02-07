'use strict';

angular.module('myApp.changePassword', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/changePassword', {
            templateUrl: '../../views/user/changePassword.html',
            controller: 'ChangePasswordCtrl'
        });
    }])

    .controller('ChangePasswordCtrl', ['$scope', '$http','$location','$rootScope', function ($scope, $http, $location, $rootScope) {
        $scope.init = function() {
            $scope.validateLogin();
        };

        $scope.validateLogin = function() {
            if (typeof $rootScope.token === "undefined" || $rootScope.token === null) {
                $location.path('/login');
            }
        };
        //move this, gets cluttery
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

        $scope.changePassword = function() {
            //must match
            if($scope.newPassword === $scope.newPassword2) {
                //cant be empty
                if($scope.newPassword !== "") {
                    //change password
                    var data = {
                        token: $rootScope.token,
                        newPassword: $scope.newPassword
                    };
                    $http.post('http://localhost:3000/users/change-password', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                        .success(function (data, status, headers, config) {
                            console.log("bra jobbat");
                            console.log(status, "status");
                            console.log(data, "data");
                            console.log(headers, "headers");
                            console.log(config, "config");
                            //only need success message on this one
                        })
                        .error(function (data, status, header, config) {
                            alert("XD");
                        });
                } else {
                    $scope.error = "Password can't be empty";
                }
            } else {
                $scope.error = "Passwords must match";
            }
        };

    }]);