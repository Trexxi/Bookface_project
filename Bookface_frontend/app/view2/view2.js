'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http',function($scope, $http) {
  var data = {
    firstName: "LINUS",
      lastName:"beckman",
      isTired: true
  };

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    function serializeData( data ) {
        // If this is not an object, defer to native stringification.
        if ( ! angular.isObject( data ) ) {
            return( ( data == null ) ? "" : data.toString() );
        }

        var buffer = [];

        // Serialize each key in the object.
        for ( var name in data ) {
            if ( ! data.hasOwnProperty( name ) ) {
                continue;
            }

            var value = data[ name ];

            buffer.push(
                encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
            );
        }

        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join( "&" ).replace( /%20/g, "+" );
        return( source );
    }


    $http.post('http://localhost:3000/users/newCard', serializeData({firstName:"snekenskvbokeof", lastName:"ewfwepkfewkofokewkfoewpo", isTired:false}),  {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
        .success(function (data, status, headers, config) {
            console.log("bra jobbat");
        })
        .error(function (data, status, header, config) {
            alert("XD");
        });
}]);
