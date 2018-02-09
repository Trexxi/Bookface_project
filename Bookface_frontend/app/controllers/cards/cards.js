'use strict';

angular.module('myApp.cards', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cards', {
            templateUrl: '../../views/cards/cards.html',
            controller: 'CardsCtrl'
        });
    }])

    .controller('CardsCtrl', ['$scope', '$http','$location','$rootScope','$cookies',  function ($scope, $http, $location, $rootScope, $cookies) {

      $scope.init = function(){
          $scope.validateLogin();
      };

        $scope.validateLogin = function() {
            if(typeof sessionStorage.token === "undefined") {
                $location.path('/login');
            }
        };

        /**
         * make this function reusable
         * @param data
         * @returns {string}
         */
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

        var vm = this;
        // Get Cards info
        $scope.getCards = function () {
            $http({method: 'GET', url: "http://localhost:3000/users"})
                .success(function (data) {
                    $scope.users = data;
                })
                .error(function (error) {
                    console.log(error);
                });
        };
        // Post data to database
        $scope.postData = function () {
            var data = {
                message: $scope.myText,
                date: $scope.date = new Date(),
                token:sessionStorage.token
            };
            $http.post('http://localhost:3000/users/newCard', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
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
        };

        $scope.removeData = function (id) {
            var data = {
                _id: id
            };
            $http.post('http://localhost:3000/users/deleteCard', serializeData(data), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function (data, status, headers, config) {
                    console.log("BORTA");
                })
                .error(function (data, status, header, config) {
                    alert("XD...");
                });

        };

        $scope.getCards();
        $scope.isActive = false;
        $scope.activeButton = function () {
            $scope.isActive = !$scope.isActive;
        };


//  Make textarea bigger when on focus
        $scope.areaOfEffect = function () {
            var textElement = angular.element(document.querySelector('#messageArea'));
            $scope.activeButton();
            textElement.attr('rows', '5');
            //console.log(textElement);
        };
//  Make texarea smaller if the textarea value is 0
        $scope.notAreaOfEffect = function () {
            var textInBox = $scope.myText;

            var textElement = angular.element(document.querySelector('#messageArea'));
            if (textInBox === undefined) {
                textInBox = "";
            }
            if (textInBox.length === 0) {
                textElement.attr('rows', '1');

            }
        };
// Submit to the database
        $scope.pushingForward = function () {
            var textInBox = $scope.myText;
            if (textInBox === undefined) {
                textInBox = "";
            }
            if (textInBox.length !== 0) {
                //HERE POST THINGY!
                $scope.postData();
                $scope.myText = '';
                $scope.notAreaOfEffect();

            } else {
                alert("NO");
            }
            $scope.getCards();
        };

        $scope.testRemoveData = function (rId) {
            console.log("is it working?" + rId);
        };

        /* $scope.confirmDelete = function(id) {
             console.log(id);
             SweetAlert.swal({
                 title:"Are you sure?",
                 text:"This card will be removed permamently.",
                 type:"warning",
                 showCancelButton:true,
                 confirmButtonColor: "#d80f0f",
                 confirmButtonText:"Delete!",
                 cancelButtonText:"Cancel",
                 closeOnConfirm:false,
                 closeOnCancel:false
             },
                 function (isConfirm) {
                     if (isConfirm) {
                         $scope.removeData(id);
                         SweetAlert.swal("Deleted!", "", "success");
                         $scope.getCards();
                     } else {
                         SweetAlert.swal("Cancelled", "Next time don't click it.", "error");
                     }
                 });
         };

        */
    }]);

