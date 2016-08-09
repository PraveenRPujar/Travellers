TRVLS.Utility = (function () {
    return {

        getValuesInObject: function (obj) {
            var values = [];
            for (o in obj) {
                if (obj.hasOwnProperty(o)) {
                    values.push(obj[o]);
                }
            }
            return values;
        },

        getKeysInObject: function (obj) {
            var keys = [];
            if ('keys' in Object) {
                return Object.keys(obj);
            } else {
                for (o in obj) {
                    if (obj.hasOwnProperty(o)) {
                        keys.push(o);
                    }
                }
                return keys;
            }
        },

        findValueInObject: function (obj, value) {
            for (var o in obj) {
                if (obj.hasOwnProperty(o) && obj[o] === value) {
                    return value;
                }
            }

        },

        findKeyInObject: function (obj, key) {
            for (var o in obj) {
                if (obj.hasOwnProperty(o) && o === key) {
                    return key;
                }
            }
        },

        findValueInObjectArray: function (collection, key, value) {
            var obj = null;
            for (var i = 0; i < collection.length; i++) {
                obj = collection[i];
                if (obj[key] === value) {
                    return obj;
                }
            }
        }

    };
})();
