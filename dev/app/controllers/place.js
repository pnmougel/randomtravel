'use strict';

App.controller('PlaceCtrl', function ($scope, $ionicPlatform, $cordovaGeolocation, $state, $location, Place, $rootScope, $stateParams, $ionicSlideBoxDelegate, $cordovaCamera) {
    $scope.places = [];
    $scope.isLoading = true;
    $scope.noResults = false;
    $scope.maxDistance = $stateParams.maxDistance || 3;
    $scope.minDistance = $stateParams.minDistance || 0;

    //var toRadians = function (degrees) {
    //    return degrees * Math.PI / 180;
    //};

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

    var shuffle = function (o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    $scope.getPlaces = function () {
        Place.get({
            minDistance: $scope.minDistance,
            maxDistance: $scope.maxDistance,
            lat: $rootScope.pos.coords.latitude,
            lng: $rootScope.pos.coords.longitude,
            limit: 100
        }).$promise
            .then(function (places) {
                places = shuffle(places);

                places.forEach(function (place) {
                    place.imageUrl = "data:image/jpeg;base64," + place.image;
                    if(place.distance < 1) {
                        var distanceMeters = Math.floor(place.distance * 1000);
                        place.distanceStr = distanceMeters + ' meter' + (distanceMeters > 1 ? 's' : '');
                    } else {
                        place.distanceStr = place.distance.toFixed(2) + ' km'
                    }
                    place.mapUrl = 'geo:' + place.p.lat + ',' + place.p.lng + '?q=' + place.p.lat + ',' + place.p.lng;
                });
                $scope.places = places;
                $scope.isLoading = false;
                if($scope.places.length === 0) {
                    $scope.noResults = true;
                }
                $ionicSlideBoxDelegate.update();
            }, function (err) {
                $scope.noResults = true;
            })
    };

    if (!('pos' in $rootScope)) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            $rootScope.pos = pos;
            $scope.getPlaces();
        }, function (error) {}, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000
        });
    } else {
        $scope.getPlaces();
    }
});