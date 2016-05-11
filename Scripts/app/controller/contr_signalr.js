
app.controller("SignalRAngularCtrl", function ($scope, signalRSvc, $rootScope) {
    $scope.text = "Hej svejs";

    $scope.greetAll = function () {
        signalRSvc.sendRequest();
    }

    updateGreetingMessage = function (text) {
        $scope.text = text;
    }

    signalRSvc.initialize();

    //Updating greeting message after receiving a message through the event

    $scope.$parent.$on("acceptGreet", function (e, message) {
        $scope.$apply(function () {
            updateGreetingMessage(message)
        });
    });
});
