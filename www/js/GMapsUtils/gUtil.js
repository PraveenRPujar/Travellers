TRVLS.GMapsUtils = (function () {


    return {
        createMarker: function (place, mapID) {
            var placeLoc = place.geometry.location,
                marker = new google.maps.Marker({
                    map: mapID,
                    position: place.geometry.location
                });

            return marker;

        }
    }


})();
