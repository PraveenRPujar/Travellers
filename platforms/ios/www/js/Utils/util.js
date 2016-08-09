TRVLS.Utility.getValuesInObject = function (obj) {
    var values = [];
    for (o in obj) {
        values.push(obj[o]);
    }
    return values;
}
