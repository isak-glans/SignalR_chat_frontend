var app = angular.module("chatApp");

app.controller('roomCtrl', ['$scope', '$http', '$routeParams', 'RoomList', "$location", "chatService", function ($scope, $http, $routeParams, RoomList, $location, chatService) {
    
    var theRoomList;
    var errorMsg;
    var slugExist = false;
    $scope.messages = [];

    var slug = $routeParams.slug;
    $scope.username = $routeParams.username;

    // Hämta roomlist när promise klart.
    RoomList.getList().then(function (listan) {
        // Från service (singleton)
        theRoomList = listan;

        // Check if GET-paremter slug exists in roomlist.
        var foundRoom = theRoomList.find(function (room) {
            return room.room_slug == slug;
        });

        // If populated..
        if ( !!foundRoom ) {
            $scope.slug = slug;
            slugExist = true;

            // When connection done
            chatService.connectionIsDone().then(function () {
                console.log("Connection is done...");

                // Join room.
                chatService.joinRoom(slug, $scope.username);
            });
            
        } else {
            console.log("Slug invalid.");
            // Redirect to home.
            $location.path("/");
        }

    }, function () {
        // On error.
        console.error("Något blev fel.");        
    });


    // Om user lyckats gå in i rummet.
    $scope.$on('joinRoomSignal', function (event, data) {
        //console.log(data);
        console.log("incomingChat");
        $scope.messages.push({ "username": data.username, "text": "Joins the room." });
        // update the grapics
        $scope.$digest();
    });


    // Tar emot det servern skickar ut. Den reagerar på en händelse.
    $scope.$on('incomingChat', function (event, data) {
        //console.log(data);
        
        $scope.messages.push({ "username": data.username, "text": data.text });

        // update the grapics
        $scope.$digest();

        /*var obj = { msg: data.text };
        $scope.messages.push(obj);
        $scope.$digest();*/
        
    });



    // sendMessage action, that will handle the submit event in the view
    $scope.sendMessage = function () {
        // Add the message to the chat message list
        // addMessage({ from: 'me', txt: this.message });

        console.log("Skickar");

        if ( slugExist ) {
            chatService.sendMessage(slug, $scope.username, $scope.myMessage);
        }

        

        // Clear the message model
        self.message = '';
    };

}]);