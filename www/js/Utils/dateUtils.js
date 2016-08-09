TRVLS.Date = (function () {

    var weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        longMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var getFormatted_DDMMYYYY_Date = function (date) {
        return date.getDate() + " " + longMonths[date.getMonth()] + " " + date.getFullYear();
    }


    return {
        getFormatted_DDMMYYYY_Date: getFormatted_DDMMYYYY_Date
    };

})();
