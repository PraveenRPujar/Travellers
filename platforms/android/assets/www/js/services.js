var appServices = appServices || angular.module('travellers.services', []);

appServices.factory('connect', function ($http) {

    var success, failure, ajax;

    ajax = function (url, options) {

        $http.get(url, options).then(function (response) {
            options.success(response);
        }, function (error) {
            options.failure(error);
        });

    }

    return {
        ajax: ajax
    };
});