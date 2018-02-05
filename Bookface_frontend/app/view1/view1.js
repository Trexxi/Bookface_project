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
            $scope.notAreaOfEffect();
        } else {
            alert("Can't send empty message");
        }
    };
}]);