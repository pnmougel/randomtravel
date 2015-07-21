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
]).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
});
