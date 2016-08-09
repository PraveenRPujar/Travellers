TRVLS.Logger.logToConsole = function (x) {

    if (!TRVLS.Config.logger) {
        return;
    }

    switch (typeof x) {
    case "string":
        console.log(x);
        break;
    case "object":
        console.dir(x);
    }

};

TRVLS.Logger.alert = function (message) {
    //Can be enhances to have Cordova / ionic plugin to show this alert!
    window.alert(message);
};