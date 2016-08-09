var appControllers = appControllers || angular.module('travellers.controllers', []);

appControllers.controller('NotificationCtrl', function ($scope, $ionicLoading, $ionicPopup) {

    var notifications = TRVLS.Registry.notifications,
        processedNotification = [];

    for (n in notifications) {
        notifications[n]["id"] = n;
        processedNotification.push(notifications[n]);
    }

    $scope.items = processedNotification.reverse();

    $scope.joiningTrip = function (index) {
        var selectedTripID = $scope.items[index].tripID,
            notificationPath = "/Notifications/" + firebase.auth().currentUser.uid + "/" + $scope.items[index].id;


        //Check whether the trip has been available to be associated! 
        //Mandatory since the particular trip can be deleted by admin
        checkTrip(selectedTripID, notificationPath, index, joinTrip);

    };

    $scope.notJoiningTrip = function (index) {
        var selectedTripID = $scope.items[index].tripID,
            uid = firebase.auth().currentUser.uid,
            notificationPath = "/Notifications/" + uid + "/" + $scope.items[index].id,
            memberStatusPath = "/TripsDetails/" + selectedTripID + "/tMembers/" + uid;

        checkTrip(selectedTripID, notificationPath, index, rejectTrip);

    };

    var joinTrip = function (index, notificationPath) {

            var selectedTripID = $scope.items[index].tripID,
                uid = firebase.auth().currentUser.uid,
                tripID = {},
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

        },
        checkTrip = function (selectedTripID, notificationPath, index, callback) {

            var tripID = null;

            $ionicLoading.show({
                template: TRVLS.Constants.JoiningTrip
            }).then(function () {
                TRVLS.FBUtils.checkTripID(selectedTripID).then(function (value) {
                    tripID = value.val();
                    if (tripID == null) {
                        return TRVLS.FBUtils.removeItem(notificationPath);
                    }
                }).then(function () {

                }).catch(function (error) {
                    console.log(error);
                }).done(function () {
                    $ionicLoading.hide();

                    if (tripID !== null) {
                        callback.apply($scope, [index, notificationPath]);
                    } else {
                        $scope.items.splice(index, 1);

                        $ionicPopup.alert({
                            title: 'Message',
                            template: TRVLS.Constants.tripDeleted
                        });
                    }




                });
            });

        },
        rejectTrip = function (index, notificationPath) {

            var selectedTripID = $scope.items[index].tripID,
                uid = firebase.auth().currentUser.uid,
                notificationPath = "/Notifications/" + uid + "/" + $scope.items[index].id,
                memberStatusPath = "/TripsDetails/" + selectedTripID + "/tMembers/" + uid;

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
