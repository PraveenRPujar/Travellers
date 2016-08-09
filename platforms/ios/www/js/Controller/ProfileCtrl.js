var appControllers = appControllers || angular.module('travellers.controllers', []);

appControllers.controller('EditProfileCtrl', function ($scope, $location, $ionicHistory, $ionicLoading) {

    $ionicHistory.nextViewOptions({
        disableBack: true
    });

    $scope.showEditProfile = true;
    $scope.status = false;
    $scope.header = "Success"; //Assuming the udpate will be successful.

    var userDetails = {};

    $ionicLoading.show({
        template: TRVLS.Constants.ProgressText
    }).then(function () {
        TRVLS.User.fetchDetailsFromServer().then(function (snapshot) {
            userDetails = snapshot.val();
            fillDetails(userDetails);
            $ionicLoading.hide();
        });
    });

    var fillDetails = function (userDetails) {
            $scope.firstName = userDetails.firstName;
            $scope.lastName = userDetails.lastName;
            $scope.phone = userDetails.phone;
            $scope.email = userDetails.email;
        },
        getUserDetails = function () {
            userDetails = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                phone: $scope.phone,
                email: $scope.email
            };

            return userDetails;

        }

    $scope.updateProfile = function () {

        userDetails = getUserDetails();

        $ionicLoading.show({
            template: TRVLS.Constants.ProgressText
        }).then(function () {
            TRVLS.FBUtils.updateUserDetails(userDetails).then(function () {
                $ionicLoading.hide();
                $scope.showEditProfile = !$scope.showEditProfile;
                $scope.status = !$scope.status;
            });
        });
    };

    $scope.goBackToHome = function () {
        $location.path('/app/home');
        $scope.showEditProfile = !$scope.showEditProfile;
        $scope.status = !$scope.status;
    };


});
