var appControllers = appControllers || angular.module('travellers.controllers', []);
appControllers.controller('AboutCtrl', function ($scope) {

    $scope.version = TRVLS.Config.version;

});
