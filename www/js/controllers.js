var appControllers = angular.module('travellers.controllers', []);

appControllers.controller('AppCtrl', function ($scope, $location, $ionicLoading, $ionicModal, $ionicHistory) {

    $scope.logout = function () {
        firebase.auth().signOut().then(function () {

            clearReferences();
            $location.path('/login');

        }, function (error) {
            // TODO: Handle the error
        });
    };

    var clearReferences = function () {
        TRVLS.Registry = {};
    };

});
