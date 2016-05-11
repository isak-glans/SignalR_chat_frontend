var app = angular.module("chatApp");

app.factory('RoomList', ['$q', '$http', function ($q, $http) {

    var exp = {};
    var roomList;
    
    exp.getList = function () {
        // Skapar löfte.
        var deferred = $q.defer();
        
        // If roomlist not undefined - if it is populated.
        if (!!roomList) {
            // Uppfyller löftet innan funktionen retunerar det.
            deferred.resolve(roomList);
        } else {
            // Make ajax call to backend.
            $http({
                method: 'GET',
                url: 'http://localhost:57762/api/ChatRooms'
            }).then(function successCallback(response) {
                console.log(response);

                roomList = response.data;

                // Lämna tillbaka.
                deferred.resolve(roomList);

            }, function errorCallback(response) {
                deferred.reject();
            });
        }

        // Ger löftet
        return deferred.promise;
    }
    
    return exp;
}]);