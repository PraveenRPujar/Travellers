TRVLS.Validation.email = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

TRVLS.Validation.password = function (pwd, rpwd) {
    var isValid = true;

    if (pwd.length < 8) {
        isValid = false;
    }

    if (pwd == rpwd) {
        isValid = false;
    }

    return isValid;
};
