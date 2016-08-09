TRVLS.Device.getUserLocation = function () {

    var location = {
            latitude: "",
            longitude: ""
        },
        errorCode = {
            "1": "PERMISSION_DENIED",
            "2": "POSITION_UNAVAILABLE",
            "3": "TIMEOUT"
        };

    return new Promise(function (resolve, reject) {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (loc) {
                location.latitude = loc.coords.latitude;
                location.longitude = loc.coords.longitude;
                resolve(location);
            }, function (error) {
                reject(error.message);
            });
        } else {
            reject("Geolocation feature is not available!");
        }

    });
};
