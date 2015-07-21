'use strict';

App.controller('AddPlaceCtrl', function ($scope, $ionicPlatform, $cordovaGeolocation, $cordovaCamera, $stateParams, Place, $state) {
    $scope.imageSrc = '';
    $scope.place = {
        description: ''
    };
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
        navigator.geolocation.getCurrentPosition(function(pos) {
            Place.add({
                image: $scope.imageData,
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                description: $scope.place.description
            }).$promise.then(function (data) {
                $state.go('main');
            }, function (err) {
                console.log(JSON.stringify(err));
                console.log(err);
            })
        }, function(error) {
            console.log('Got error!');
            console.log(error);
        });
    }
});