TRVLS.Storage.storeProfile = function (profile) {

    //Assuming the webview (Android & iOS) supports Local Storage
    if (window.localStorage) {
        localStorage.setItem(TRVLS.Constants.ProfileName, JSON.stringify(profile));
    }
};

TRVLS.Storage.getProfile = function () {

    if (window.localStorage) {
        var profile = {};

        profile = localStorage.getItem(TRVLS.Constants.ProfileName);

        if (!!profile) {
            return JSON.parse(profile);
        }

        return TRVLS.Profile;
    }
};