'use strict';

App.controller('MapCtrl', function ($scope) {
    $scope.map = { center: { latitude: 45.7528985, longitude: 4.8422856 }, zoom: 17 };

    $scope.positions = [];
    var pos = new google.maps.LatLng(45.7528985, 4.8422856);
    $scope.positions.push({lat: pos.k,lng: pos.B});

    var directionsDisplay = new google.maps.DirectionsRenderer();;
    var directionsService = new google.maps.DirectionsService();

    function calcRoute() {
        var start = "45.7528985,4.9422856";
        var end = pos.k + "," + pos.B;

        var request = {
            origin: start,
            destination: end,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log('enter!');
            }
        });
    }

    calcRoute();

});