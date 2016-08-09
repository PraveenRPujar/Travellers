var appControllers = appControllers || angular.module('travellers.controllers', []);

appControllers.controller('NotificationCtrl', function ($scope, $ionicLoading) {

    var notifications = TRVLS.Registry.notifications,
        processedNotification = [];

    for (n in notifications) {
        notifications[n]["id"] = n;
        processedNotification.push(notifications[n]);
    }


    $scope.items = processedNotification.reverse();

    $scope.joiningTrip = function (index) {

        var selectedTripID = $scope.items[index].tripID,
            uid = firebase.auth().currentUser.uid,
            tripID = {},
            notificationPath = "/Notifications/" + uid + "/" + $scope.items[index].id,
            memberStatusPath = "/TripsDetails/" + selectedTripID + "/tMembers/" + uid;


        tripID[selectedTripID] = selectedTripID;

        $ionicLoading.show({
            template: TRVLS.Constants.JoiningTrip
        }).then(function () {

            TRVLS.FBUtils.updateAssociatedTripDetails(tripID, uid).then(TRVLS.FBUtils.removeItem(notificationPath)).then(TRVLS.FBUtils.updateMemberStatus(memberStatusPath, {
                    status: 1001
                }))
                .then(function () {
                    $scope.items.splice(index, 1);
                }).catch(function (error) {
                    console.log(error);

                }).done(function () {
                    $ionicLoading.hide();
                });

        });

    };

    $scope.notJoiningTrip = function (index) {
        var selectedTripID = $scope.items[index].tripID,
            uid = firebase.auth().currentUser.uid,
            tripID = {},
            notificationPath = "/Notifications/" + uid + "/" + $scope.items[index].id,
            memberStatusPath = "/TripsDetails/" + selectedTripID + "/tMembers/" + uid;

        tripID[selectedTripID] = selectedTripID;

        $ionicLoading.show({
            template: TRVLS.Constants.JoiningTrip
        }).then(function () {

            TRVLS.FBUtils.removeItem(notificationPath).then(TRVLS.FBUtils.updateMemberStatus(memberStatusPath, {
                    status: 1002
                }))
                .then(function () {
                    $scope.items.splice(index, 1);
                }).catch(function (error) {
                    console.log(error);

                }).done(function () {
                    $ionicLoading.hide();
                });
        });
    };



});
