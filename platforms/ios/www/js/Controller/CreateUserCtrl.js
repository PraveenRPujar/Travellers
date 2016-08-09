var appControllers = appControllers || angular.module('travellers.controllers', []);
appControllers.controller('createUserCtrl', function ($scope, $ionicLoading, $location, $ionicPopup) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.registration = true;
    $scope.status = false;
    $scope.isValid = false;


    var userLocation;

    $scope.emailValidation = function () {
        return TRVLS.Validation.email($scope.email);
    };

    $scope.passwordValidation = function () {
        if ($scope.password == undefined || $scope.rpassword == undefined) {
            return false;
        }
        return !TRVLS.Validation.password($scope.password, $scope.rpassword);
    };

    $scope.validate = function () {
        $scope.isValid = $scope.emailValidation() && $scope.passwordValidation();
    };

    $scope.fetchLocation = function () {
        userLocation = null;

        if ($scope.locationAccess) {

            $ionicLoading.show({
                template: TRVLS.Constants.FetchingLocation
            }).then(function () {
                TRVLS.Utility.getUserLocation().then(function (location) {
                    userLocation = location;
                }).catch(showError).done(function () {
                    $ionicLoading.hide();
                });;
            });
        }

    };

    var showError = function (error) {
        $ionicPopup.alert({
            title: 'Error!',
            template: error
        });
    };


    $scope.createUser = function () {

        TRVLS.User.update({
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            phone: $scope.phone,
            location: userLocation
        });

        var onUserCreationFailure = function (error) {
                $ionicLoading.hide();
                var errorCode = error.code;
                var errorMessage = error.message;
                TRVLS.Logger.logToConsole(error);
            },

            onUserCreationSuccess = function (user) {
                //TODO: Profile photo integration is pending.

                $ionicLoading.hide();
                $location.path('/app/home');
            },

            updateUsersDB = function (user) {

                var usersObj = {};

                usersObj[user.uid] = TRVLS.User.get();

                return firebase.database().ref('Users').update(usersObj);

            };


        $ionicLoading.show({
            template: TRVLS.Constants.CreatingUser
        }).then(function () {
            //Trigger FB call to create user
            firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(updateUsersDB)
                .then(onUserCreationSuccess)
                .catch(onUserCreationFailure);
        });

    };
});
