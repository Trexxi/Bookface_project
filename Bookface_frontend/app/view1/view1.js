'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http',function($scope, $http) {
    $http({
        method: 'GET',
        url: "http://localhost:3000/users"
    }).success(function(data) {
    console.log(data);
    $scope.users = data;
  }).error(function(error){
    console.log(error);
  });

    $scope.postData = function() {
        var data = {
            firstName: "OLLLLOF",
            lastName: "Nah",
            isTired: true
        };

        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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

            // Serialize the buffer and clean it up for transportation.
            var source = buffer.join("&").replace(/%20/g, "+");
            return (source);
        }


        $http.post('http://localhost:3000/users/newCard', serializeData({
            firstName: "snekenskvbokeof",
            lastName: "ewfwepkfewkofokewkfoewpo",
            isTired: false
        }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (data, status, headers, config) {
                console.log("bra jobbat");
            })
            .error(function (data, status, header, config) {
                alert("XD");
            });
    }




    $scope.areaOfEffect = function(){
        var textElement = angular.element(document.querySelector('#messageArea'));
        //console.log(textElement);
        textElement.attr('rows', '5');
        //console.log(textElement);
    };

    $scope.notAreaOfEffect = function() {
        var textInBox = $scope.myText;
        var textElement = angular.element(document.querySelector('#messageArea'));
        if (textInBox === undefined){
            textInBox = "";
        } if (textInBox.length === 0) {
            textElement.attr('rows', '1');
        }
    };

    $scope.pushingForward = function() {
        var textInBox = $scope.myText;
        if(textInBox === undefined){
            textInBox = "";
        }
        if(textInBox.length !== 0){
            //HERE POST THINGY!
            $scope.myText ='';
            $scope.postData();
            $scope.notAreaOfEffect();
        } else {
            alert("Can't send empty message");
        }
    };
}]);