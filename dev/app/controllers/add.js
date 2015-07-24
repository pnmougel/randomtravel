'use strict';

App.controller('AddPlaceCtrl', function ($scope, $ionicPlatform, $cordovaGeolocation, $cordovaCamera, $stateParams, Place, $state) {
    $scope.imageSrc = '';
    $scope.place = {
        description: ''
    };
    $scope.thanks = false;
    $scope.thanksLoad = true;
    $scope.thanksError = false;
    if('image' in $stateParams) {
        $scope.imageData = $stateParams.image;
        $scope.imageSrc = "data:image/jpeg;base64," + $stateParams.image;
    }

    $scope.takePicture = function () {
        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture({
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                 allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                 targetWidth: 800,
                targetHeight: 800,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            }).then(function(imageData) {
                $scope.imageData = $stateParams.image;
                $scope.imageSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log('There was an error');
            });
        });
    };
    
    $scope.save = function () {
        $scope.thanks = true;
        navigator.geolocation.getCurrentPosition(function(pos) {
            Place.add({
                image: $scope.imageData,
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                description: $scope.place.description
            }).$promise.then(function (data) {
                $scope.thanksLoad = false;
            }, function (err) {
                $scope.thanksError = true;
            })
        }, function(error) {
            $scope.thanksError = true;
        });
    }
});