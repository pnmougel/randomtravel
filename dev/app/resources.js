App.factory('Place', function($resource, Config) {
        return $resource(Config.server.url + '/place', {}, {
            add: {
                method: 'POST'
            },
            get: {
                method: 'GET',
                url: Config.server.url + '/place',
                isArray: true
            }
        });
    });


