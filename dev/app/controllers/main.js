'use strict';

App.controller('MainCtrl', function ($scope, $ionicPlatform, $cordovaGeolocation, $state, $cordovaCamera, $rootScope) {
    //navigator.geolocation.getCurrentPosition(function (pos) {
    //    $rootScope.pos = pos;
    //}, function (error) {}, {
    //    enableHighAccuracy: false,
    //    timeout: 10000,
    //    maximumAge: 60000
    //});

    $scope.add = function () {
        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture({
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 400,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            }).then(function(imageData) {
                $state.go('add', { image: imageData });
            }, function(err) {
                console.log('There was an error');
            });
        });
    };
});