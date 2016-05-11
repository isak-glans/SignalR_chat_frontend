var app = angular.module("chatApp");

app.controller('homeCtrl', ['$scope', '$http', 'RoomList', '$sanitize', '$location', function ($scope, $http, RoomList, $sanitize, $location) {
    $scope.username = "Anonym";
    $scope.chatRooms = [];        

    // Hämta roomlist när promise klart.
    RoomList.getList().then(function (listan) {        
        // Från service (singleton)
        $scope.chatRooms = listan;        
    }, function () {
        // On error.
        console.error("Något blev fel.");
    });
    
    $scope.clickRoom = function (slug) {
        var username = $scope.username;

        if (!!username) {
            var username_san = $sanitize(username);
            if (username_san.length > 0) {
                $location.path("room/" + slug + "/" + username_san );
            }            
        }

        console.log( "Klick " + $sanitize($scope.username) );
    }
}]);