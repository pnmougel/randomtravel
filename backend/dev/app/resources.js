App.factory('Places', function($resource, Config) {
        return $resource(Config.server.url + '/place', {}, {
            remove: {
                method: 'DELETE',
                url: Config.server.url + '/place/:id'
            },
            update: {
                method: 'PUT',
                url: Config.server.url + '/place'
            },
            all: {
                method: 'GET',
                url: Config.server.url + '/all',
                isArray: true
            }
        });
    });


