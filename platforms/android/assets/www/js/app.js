var app = angular.module('travellers', ['ionic', 'travellers.controllers', 'travellers.services', 'ionic-datepicker']).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}).config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'
    }).state('createuser', {
        url: '/createuser',
        templateUrl: 'templates/createuser.html'
    }).state('fp', {
        url: '/fp',
        templateUrl: 'templates/forgotpassword.html'
    }).state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    }).state('app.home', {
        cache: false,
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    }).state('app.profile', {
        cache: false,
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'EditProfileCtrl'

            }
        }
    }).state('app.nearme', {
        cache: false,
        url: '/nearme',
        views: {
            'menuContent': {
                templateUrl: 'templates/nearme.html',
                controller: 'NearMeCtrl'

            }
        }
    }).state('app.tripdetails', {
        cache: false,
        url: '/tripdetails',
        views: {
            'menuContent': {
                templateUrl: 'templates/tripdetails.html',
                controller: 'TripDetailsCtrl'

            }
        }
    }).state('app.about', {
        cache: false,
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html',
                controller: 'AboutCtrl'
            }
        }
    }).state('app.notifications', {
        cache: false,
        url: '/notifications',
        views: {
            'menuContent': {
                templateUrl: 'templates/notifications.html',
                controller: 'NotificationCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
var TRVLS = TRVLS || {};
TRVLS = {
    Utility: {},
    Logger: {},
    Constants: {},
    Config: {},
    FBUtils: {},
    Storage: {},
    Profile: {},
    User: {},
    Validation: {},
    Registry: {},
    Date: {}
};
//Initial App profile config
TRVLS.Profile = {
    username: "",
    rememberMe: false
};
