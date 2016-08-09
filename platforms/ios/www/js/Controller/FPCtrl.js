var appControllers = appControllers || angular.module('travellers.controllers', []);

appControllers.controller('fpCtrl', function ($scope, $ionicLoading) {

    $scope.resetform = true;
    $scope.status = false;
    $scope.header = "";

    $scope.validate = function () {
        return !TRVLS.Validation.email($scope.email);
    };

    $scope.onResetPassword = function () {

        $ionicLoading.show({
            template: TRVLS.Constants.ResettingPassword
        }).then(function () {

            firebase.auth().sendPasswordResetEmail($scope.email).then(function () {
                //TODO: Success message should be reading from constants, instead of hard coding!
                $scope.resetform = !$scope.resetform;
                $scope.status = !$scope.status;
                $scope.header = TRVLS.Constants.Success;

                $ionicLoading.hide();

            }, function (error) {
                //TODO: Handle error scenario with displaying correct error message!
                $scope.resetform = !$scope.resetform;
                $scope.status = !$scope.status;
                $scope.header = TRVLS.Constants.Failure;

            });

        });

    };


});
