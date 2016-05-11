var app = angular.module("chatApp", ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
    }).
    when('/room/:slug/:username', {
        templateUrl: 'partials/chatRoom.html',
        controller: 'roomCtrl'
    }).
    when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'adminCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });
}]);

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
})