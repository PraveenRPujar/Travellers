TRVLS.User = (function () {
    var user = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            location: {}
        },
        update = function (data) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.phone = data.phone;
            user.location = data.location;
        },
        get = function () {
            return user;
        },
        fetchDetailsFromServer = function () {
            return TRVLS.FBUtils.getUserDetails();
        };

    return {
        update: update,
        get: get,
        fetchDetailsFromServer: fetchDetailsFromServer
    };

})();
