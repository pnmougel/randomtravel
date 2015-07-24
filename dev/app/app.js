var App = angular.module('random-travel', [
    'ionic',
    'ngRoute',
    'ngCordova',
    //'ngDialog',
    'ui.bootstrap',
    'ngTouch',
    'ui.router',
    'ngResource',
    'swipe',
    'app.config.release'
]).run(function($ionicPlatform, $cordovaStatusbar, $rootScope) {

    Array.prototype.shuffle = function (){
        for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    };

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        // Retrieve the location
        navigator.geolocation.watchPosition(function (pos) {
            console.log('retrieved location');
            $rootScope.pos = pos;
        }, function (error) {
            console.log('Unable to retrieve the position');
            console.error(error);
        }, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000
        });

        if (window.StatusBar) {
            $cordovaStatusbar.styleHex('#18A2B7');

            // org.apache.cordova.statusbar required
            //StatusBar.styleLightContent();
        }
    });
});
