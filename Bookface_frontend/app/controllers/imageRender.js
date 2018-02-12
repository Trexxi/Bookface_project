'use strict';

angular.module('myApp.imageRender', ['ngRoute', 'oitozero.ngSweetAlert'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/testRender', {
            templateUrl: '../../views/imageRender.html',
            controller: 'ImageRenderCtrl'
        });
    }])

    .controller('ImageRenderCtrl', ['$scope', '$http','$location','$rootScope','SweetAlert', function ($scope, $http, $location, $rootScope, SweetAlert, fileReader) {
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
        $scope.doneRender = false;
        $scope.renderImages = function() {
            var data = {
                token:sessionStorage.token
            };
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                // Use a lookup table to find the index.
            var lookup = new Uint8Array(256);
            for (var i = 0; i < chars.length; i++) {
                lookup[chars.charCodeAt(i)] = i;
            }

            $scope.encode = function(arraybuffer) {
                var bytes = new Uint8Array(arraybuffer),
                    i, len = bytes.length, base64 = "";

                for (i = 0; i < len; i+=3) {
                    base64 += chars[bytes[i] >> 2];
                    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
                    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
                    base64 += chars[bytes[i + 2] & 63];
                }

                if ((len % 3) === 2) {
                    base64 = base64.substring(0, base64.length - 1) + "=";
                } else if (len % 3 === 1) {
                    base64 = base64.substring(0, base64.length - 2) + "==";
                }

                return base64;
            };

            $scope.decode =  function(base64) {
                var bufferLength = base64.length * 0.75,
                    len = base64.length, i, p = 0,
                    encoded1, encoded2, encoded3, encoded4;

                if (base64[base64.length - 1] === "=") {
                    bufferLength--;
                    if (base64[base64.length - 2] === "=") {
                        bufferLength--;
                    }
                }

                var arraybuffer = new ArrayBuffer(bufferLength),
                    bytes = new Uint8Array(arraybuffer);

                for (i = 0; i < len; i+=4) {
                    encoded1 = lookup[base64.charCodeAt(i)];
                    encoded2 = lookup[base64.charCodeAt(i+1)];
                    encoded3 = lookup[base64.charCodeAt(i+2)];
                    encoded4 = lookup[base64.charCodeAt(i+3)];

                    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
                    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
                    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
                }

                return arraybuffer;
            };

            $http.post('http://localhost:3000/users/getImage', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function (data, status, headers, config) {
                    $scope.images = data;
                    console.log($scope.images,"dfeefqwfewf");
                    function bufferToBase64(buf) {
                        var binstr = Array.prototype.map.call(buf, function (ch) {
                            return String.fromCharCode(ch);
                        }).join('');
                        return btoa(binstr);
                    }

                    var keys = Object.keys($scope.images);
                    console.log(keys);

                    for (var i = 0; i < keys.length; i++) {
                        console.log(i);
                        console.log($scope.images[keys[i]].data);
                        $scope.images[keys[i]].data = $scope.encode($scope.images[keys[i]].data);
                    }
                    console.log($scope.images,"efdewfwefwefwefwefwefwefwefwefwef");
                    $scope.doneRender = true;
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