var appControllers = appControllers || angular.module('travellers.controllers', []);

appControllers.controller('HomeCtrl', function ($scope, $ionicHistory, $location, $ionicLoading, $ionicModal, ionicDatePicker) {

    $scope.$on("$ionicView.enter", function () {
        //TODO: Refactor this code, not to call the method on every visit!
        $scope.trips = [];
        $scope.associatedTrips = [];

        onTripViewLoad(getAssociatedTrips);

    });

    var selectedFromDate, selectedToDate;

    $scope.notifications = [];

    var onTripViewLoad = function (callback) {

            var trip = null,
                trips = [];

            $ionicLoading.show({
                template: TRVLS.Constants.FetchingTrips
            }).then(function () {

                TRVLS.FBUtils.getTripIDs()
                    .then(TRVLS.FBUtils.getTripDetails)
                    .then(function (values) {

                        values.forEach(function (value, index, array) {
                            trip = value.val();
                            if (trip !== null) {
                                trip["memberCount"] = (trip.tMembers !== undefined) ? Object.keys(trip.tMembers).length : 0;
                                trip.tFromDate = trip.tFromDate !== undefined ? TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date(trip.tFromDate)) : undefined;
                                trip.tToDate = trip.tToDate !== undefined ? TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date(trip.tToDate)) : undefined;
                                trips.push(trip);
                            }
                        });

                        //To display the latest trips at the top! Need to refactor this code, to push the logic to DB.
                        $scope.trips = trips.reverse();
                        TRVLS.Registry.TripIDs.reverse();

                    }).catch(function (error) {
                        //TODO: Better error handling...
                        console.log(error);

                    }).done(function () {
                        $ionicLoading.hide();
                        if (callback) {
                            callback();
                        }

                    });

            });

        },
        getNotifications = function () {
            $ionicLoading.show({
                template: TRVLS.Constants.FetchingNotifications
            }).then(function () {

                TRVLS.FBUtils.getNotifications()
                    .then(function (values) {
                        if (values.val() !== null) {
                            processNotifications(values.val());
                        }
                    })
                    .catch(function (error) {
                        //TODO: Better error handling...
                        console.log(error);

                    }).done(function () {
                        $ionicLoading.hide();
                    });

            });
        },
        getAssociatedTrips = function () {

            var trips = null;

            $ionicLoading.show({
                template: TRVLS.Constants.FetchingAssociatedTrip
            }).then(function () {

                TRVLS.FBUtils.getAssociatedTrips(firebase.auth().currentUser.uid).then(TRVLS.FBUtils.getAssociatedTripDetails)
                    .then(function (values) {
                        values.forEach(function (value, index, array) {
                            trip = value.val();
                            if (trip !== null) {
                                trip["memberCount"] = (trip.tMembers !== undefined) ? Object.keys(trip.tMembers).length : 0;
                                trip.tFromDate = trip.tFromDate !== undefined ? TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date(trip.tFromDate)) : undefined;
                                trip.tToDate = trip.tToDate !== undefined ? TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date(trip.tToDate)) : undefined;
                                $scope.associatedTrips.push(trip);
                            }
                        });
                    })
                    .catch(function (error) {
                        //TODO: Better error handling...
                        console.log(error);

                    }).done(function () {
                        $ionicLoading.hide();
                        getNotifications();
                    });

            });
        };

    $scope.tripClicked = function (index) {

        TRVLS.Registry.TripDetails = {
            selectedTripID: TRVLS.Registry.TripIDs[index],
            tripMemberIDs: $scope.trips[index].tMembers,
            selectedTripName: $scope.trips[index].tName
        };

        TRVLS.Registry.isEditable = true;
        $location.path('/app/tripdetails');
    };

    $scope.associatedTripClicked = function (index) {

        TRVLS.Registry.TripDetails = {
            selectedTripID: TRVLS.Registry.AssociatedTripIDs[index],
            tripMemberIDs: $scope.associatedTrips[index].tMembers,
            selectedTripName: $scope.associatedTrips[index].tName
        };



        TRVLS.Registry.isEditable = false;
        $location.path('/app/tripdetails');
    };

    $scope.openNotifications = function () {
        TRVLS.Registry.notifications = $scope.notifications;
        $location.path('/app/notifications');
    };

    var processNotifications = function (notifications) {

        $scope.notifications = notifications;
        $scope.notificationCount = notifications === undefined ? 0 : Object.keys(notifications).length;
    }

    $scope.tripCreatemodal = {};
    $scope.tripDetails = {};

    $scope.openTripModal = function () {

        $scope.tripDetails.tripName = "";
        $scope.tripDetails.tripDesc = "";

        $ionicModal.fromTemplateUrl('templates/tripCreationModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            modal.show();

        }).catch(function (error) {
            console.log(error);
        });

    };

    $scope.tripCreatemodal.cancel = function () {
        $scope.modal.hide();
    };

    $scope.tripCreatemodal.createTrip = function () {

        var trip = {
            tName: $scope.tripDetails.tripName,
            tDescription: $scope.tripDetails.tripDesc,
            tMembers: {}
        };

        createTrip().then(createTripDetails).then(function () {
            trip.tFromDate = TRVLS.Date.getFormatted_DDMMYYYY_Date(selectedFromDate);
            trip.tToDate = TRVLS.Date.getFormatted_DDMMYYYY_Date(selectedToDate);

            //$scope.trips.splice(0, 0, trip); //Insert at the first position
            $scope.modal.hide();
            onTripViewLoad();
        }).catch(function (error) {
            console.log(error);
        });
    };

    $scope.tripDetails.showFromDate = function () {

        showDate(function (val) {
            $scope.tripDetails.from = TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date(val));
            selectedFromDate = new Date(val);
        }, selectedFromDate);
    };

    $scope.tripDetails.showToDate = function () {

        showDate(function (val) {
            $scope.tripDetails.to = TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date(val));
            selectedToDate = new Date(val);
        }, selectedToDate);
    };


    $scope.$on('modal.shown', function () {
        $scope.tripDetails.from = TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date());
        $scope.tripDetails.to = TRVLS.Date.getFormatted_DDMMYYYY_Date(new Date());
        selectedFromDate = new Date();
        selectedToDate = new Date();
    });

    var createTrip = function () {
            var tripsObj = {};

            tripsObj[TRVLS.FBUtils.generateTripID()] = TRVLS.FBUtils.generateTripID();

            return firebase.database().ref('Trips/' + firebase.auth().currentUser.uid).update(tripsObj);
        },
        createTripDetails = function () {
            var tripDetails = {};
            tripDetails[TRVLS.FBUtils.getCurrentTripID()] = {
                tName: $scope.tripDetails.tripName,
                tDescription: $scope.tripDetails.tripDesc,
                tMembers: {},
                tFromDate: selectedFromDate,
                tToDate: selectedToDate,
                timestamp: +new Date()
            };

            return firebase.database().ref('TripsDetails').update(tripDetails);

        },
        getTripIDs = function () {
            firebase.database().ref('/Trips/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
                console.log(snapshot.val());
            });
        },
        showDate = function (callbackFn, selectedDate) {
            var d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth(),
                day = d.getDate(),
                params = {
                    callback: callbackFn,
                    from: new Date(year, month, day),
                    to: new Date(year + 4, 12, 31), //As of now, we will show 4 years from now!
                    inputDate: selectedDate == undefined ? new Date() : selectedDate,
                    mondayFirst: true,
                    closeOnSelect: false,
                    templateType: 'popup'
                };

            ionicDatePicker.openDatePicker(params);
        };

});
