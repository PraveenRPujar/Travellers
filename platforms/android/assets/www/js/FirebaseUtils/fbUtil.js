TRVLS.FBUtils = (function () {
    return {
        currentTripID: "",
        generateTripID: function () {
            return TRVLS.FBUtils.currentTripID = "t" + firebase.auth().currentUser.uid.substring(0, 5) + (+new Date());
        },
        generateNotificationID: function () {
            return "n" + firebase.auth().currentUser.uid.substring(0, 5) + (+new Date());
        },
        getCurrentTripID: function () {
            return TRVLS.FBUtils.currentTripID;
        },
        getTripIDs: function () {
            return firebase.database().ref('/Trips/' + firebase.auth().currentUser.uid).once('value');
        },
        getTripDetails: function (data) {
            var tripIDs = TRVLS.Utility.getValuesInObject(data.val());

            TRVLS.Registry.TripIDs = tripIDs;

            var tripDetails = tripIDs.map(function (currValue, index, array) {
                return firebase.database().ref('/TripsDetails/' + currValue[0]).once('value');
            });

            return firebase.Promise.all(tripDetails);
        },
        getUserDetails: function (userId) {
            if (userId !== undefined) {
                return firebase.database().ref('/Users/' + userId).once('value');
            }

            return firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).once('value');
        },
        getSpecificUserDetails: function (data) {
            //var userIDs = Object.keys(data.val()); //TRVLS.Utility.getValuesInObject(data);


            var userDetails = data.map(function (currValue, index, array) {
                return firebase.database().ref('/Users/' + currValue).once('value');
            });

            return firebase.Promise.all(userDetails);
        },
        updateUserDetails: function (userDetails) {
            return firebase.database().ref('/Users/' + firebase.auth().currentUser.uid).update(userDetails);
        },
        getTripMembers: function (tripID) {
            return firebase.database().ref('/TripsDetails/' + tripID + '/tMembers/').once('value');
        },
        getUsers: function () {
            return firebase.database().ref('/Users/').once('value');
        },
        updateTripDetails: function (tripId, memberIds) {
            return firebase.database().ref('/TripsDetails/' + tripId + '/tMembers/').update(memberIds);
        },
        updateAssociatedTripDetails: function (trip, userID) {
            return firebase.database().ref('/Users/' + userID + '/associatedTrips/').update(trip);
        },
        getAssociatedTrips: function (userID) {
            return firebase.database().ref('/Users/' + userID + '/associatedTrips/').once('value');
        },
        getAssociatedTripDetails: function (data) {
            var tripIDs = TRVLS.Utility.getValuesInObject(data.val());

            TRVLS.Registry.AssociatedTripIDs = tripIDs;

            var tripDetails = tripIDs.map(function (currValue, index, array) {
                return firebase.database().ref('/TripsDetails/' + currValue).once('value');
            });

            return firebase.Promise.all(tripDetails);
        },
        getParticularTripDetails: function (tripID) {
            return firebase.database().ref('/TripsDetails/' + tripID).once('value');
        },
        removeItem: function (path) {
            return firebase.database().ref(path).remove();
        },
        getNotifications: function () {
            return firebase.database().ref('/Notifications/' + firebase.auth().currentUser.uid).once('value');
        },
        publishNotifications: function (uid, data) {
            return firebase.database().ref('/Notifications/' + uid).update(data);
        },
        updateMemberStatus: function (path, data) {
            return firebase.database().ref(path).set(data);
        }

    }
})();
