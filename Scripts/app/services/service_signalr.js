'use strict';

angular.module('chatApp')
    .factory('chatService', ['$rootScope', '$q', function ($rootScope, $q) {

        // Declare a proxy to reference the hub. 
        var chat = $.connection.chatHub;
        
        var backendServerUrl = "http://localhost:57762";
        var hubName = 'chatHub';

        var connection = $.hubConnection(backendServerUrl);
        var proxy = connection.createHubProxy(hubName);        

        // Promise
        var connectionPromise = $q.defer();

        // Create a function that the hub can call to broadcast messages.
        proxy.on('broadcastMessage', function (_name, _message) {
            // chat.client.broadcastMessage = function (_name, _message) {
            $rootScope.$broadcast('incomingChat', { 'username' : _name, 'text' : _message });
        });

        proxy.on('joinRoomDone', function (roomSlug, username) {
            console.log("joinRoomDone");
            $rootScope.$broadcast('joinRoomSignal', { "roomSlug": roomSlug, "username": username });
        });



        // Start the connection.
        connection.start().done(function () {
            console.log("Connection is done ...");
            connectionPromise.resolve();
        });

        var theExport = {};

        theExport.joinRoom = function (roomSlug, username) {
            console.log("joinRoom");
            proxy.invoke("joinRoom", roomSlug, username);
        }
        theExport.leaveRoom = function (roomSlug, username) {
            proxy.invoke("leaveRoom", roomSlug, username);
        }

        theExport.sendMessage = function (slug, name, message) {
            // Send the message to the message hub 
            //console.log("sendMessage");
            proxy.invoke('sendMessage', slug, name, message);
        }

        theExport.connectionIsDone = function () {
            // Returns the promise
            return connectionPromise.promise;
        }

        return theExport;
}]);
