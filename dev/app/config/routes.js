App.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|geo):/);

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: './app/views/main.html',
            controller: 'MainCtrl'
        })
        .state('place', {
            url: '/place/:minDistance/:maxDistance',
            templateUrl: './app/views/place.html',
            controller: 'PlaceCtrl'
        })
        .state('add', {
            url: '/add/:image',
            templateUrl: './app/views/add.html',
            controller: 'AddPlaceCtrl'
        })
        .state('thanks', {
            url: '/map',
            templateUrl: './app/views/map.html',
            controller: 'MapCtrl'
        });
    $urlRouterProvider.otherwise('/main');
});