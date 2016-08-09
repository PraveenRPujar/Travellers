var appControllers = appControllers || angular.module('travellers.controllers', []);
appControllers.controller('LoginCtrl', function ($scope, $location, $ionicLoading, $ionicPopup, $ionicHistory) {

    //To disable the back traversing to the view. In this case, to login view
    $ionicHistory.nextViewOptions({
        //disableBack: true
    });


    //Retrieve the profile setting and update the view accordingly!    
    TRVLS.Profile = TRVLS.Storage.getProfile();
    if (TRVLS.Profile.rememberMe) {
        $scope.email = TRVLS.Profile.username;
        $scope.rememberMe = TRVLS.Profile.rememberMe;
    }

    $scope.disabled = true;

    $scope.toggleLogin = function () {
        if ($scope.email.trim().length > 0 && $scope.password.trim().length > 0) {
            $scope.disabled = false;
        }
    }

    $scope.storeEmail = function () {
        if ($scope.email !== "") {
            TRVLS.Profile.username = $scope.email;
            TRVLS.Profile.rememberMe = $scope.rememberMe;
            TRVLS.Storage.storeProfile(TRVLS.Profile);
        }
    };

    $scope.login = function () {

        if ($scope.rememberMe) {
            $scope.storeEmail();
        }

        $ionicLoading.show({
            template: TRVLS.Constants.LoggingIn
        }).then(function () {
            firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function () {
                $ionicLoading.hide();
                $location.path('/app/home');
            }).catch(onLoginError);
        });

        function onLoginError(error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Error!',
                template: error.message
            });
        }
    };

    $scope.goToCreateUser = function () {
        $location.path('/createuser');
    };

    $scope.goToFP = function () {
        $location.path('/fp');
    };
});
