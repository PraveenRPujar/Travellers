TRVLS.FBUtils = (function () {

    var TRIPS = "/Trips/",
        TRIPSDETAILS = "/TripsDetails/",
        USERS = "/Users/",
        ASSOCIATEDTRIPS = "/associatedTrips/",
        NOTIFICATIONS = "/Notifications/";


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
            return firebase.database().ref(TRIPS + firebase.auth().currentUser.uid).once('value');
        },
        getTripDetails: function (data) {
            var tripIDs = TRVLS.Utility.getValuesInObject(data.val());

            TRVLS.Registry.TripIDs = tripIDs;

            var tripDetails = tripIDs.map(function (currValue, index, array) {
                return firebase.database().ref(TRIPSDETAILS + currValue).once('value');
            });

            return firebase.Promise.all(tripDetails);
        },
        checkTripID: function (tripID) {
            return firebase.database().ref(TRIPSDETAILS + tripID).once('value');
        },
        getUserDetails: function (userId) {
            if (userId !== undefined) {
                return firebase.database().ref(USERS + userId).once('value');
            }

            return firebase.database().ref(USERS + firebase.auth().currentUser.uid).once('value');
        },
        getSpecificUserDetails: function (data) {

            var userDetails = data.map(function (currValue, index, array) {
                return firebase.database().ref(USERS + currValue).once('value');
            });

            return firebase.Promise.all(userDetails);
        },
        updateUserDetails: function (userDetails) {
            return firebase.database().ref(USERS + firebase.auth().currentUser.uid).update(userDetails);
        },
        getTripMembers: function (tripID) {
            return firebase.database().ref(TRIPSDETAILS + tripID + '/tMembers/').once('value');
        },
        getUsers: function () {
            return firebase.database().ref(USERS).once('value');
        },
        updateTripDetails: function (tripId, memberIds) {
            return firebase.database().ref(TRIPSDETAILS + tripId + '/tMembers/').update(memberIds);
        },
        updateAssociatedTripDetails: function (trip, userID) {
            return firebase.database().ref(USERS + userID + ASSOCIATEDTRIPS).update(trip);
        },
        getAssociatedTrips: function (userID) {
            return firebase.database().ref(USERS + userID + ASSOCIATEDTRIPS).once('value');
        },
        getAssociatedTripDetails: function (data) {
            var tripIDs = TRVLS.Utility.getValuesInObject(data.val());

            TRVLS.Registry.AssociatedTripIDs = tripIDs;

            var tripDetails = tripIDs.map(function (currValue, index, array) {
                return firebase.database().ref(TRIPSDETAILS + currValue).once('value');
            });

            return firebase.Promise.all(tripDetails);
        },
        getParticularTripDetails: function (tripID) {
            return firebase.database().ref(TRIPSDETAILS + tripID).once('value');
        },
        removeItem: function (path) {
            return firebase.database().ref(path).remove();
        },
        getNotifications: function () {
            return firebase.database().ref(NOTIFICATIONS + firebase.auth().currentUser.uid).once('value');
        },
        publishNotifications: function (uid, data) {
            return firebase.database().ref(NOTIFICATIONS + uid).update(data);
        },
        updateMemberStatus: function (path, data) {
            return firebase.database().ref(path).set(data);
        }

    }
})();
