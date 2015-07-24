App.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app');

    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'app/views/app.html',
            controller: 'AppCtrl'
        })
});