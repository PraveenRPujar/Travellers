var appServices = appServices || angular.module('travellers.services', []);

appServices.factory('tripCreationModal', function () {

    var tripName = "";

    return {
        getTripName: function () {
            return tripName;
        },

        setTripName: function (name) {
            tripName = name;
        }

    };
});
