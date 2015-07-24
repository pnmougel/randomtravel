
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

var mongoose = require('mongoose');
var Location = require('./location');
var geo = require('./geo');

app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

mongoose.connect('mongodb://localhost/randomTravel', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

app.use(express.static('apks'));

// Serve the backend
app.use('/backend', express.static('backend/dev'));

app.get('/place', function(req, res) {
    if('lat' in req.query && 'lng' in req.query && 'maxDistance' in req.query) {
        var limit = req.query.limit || 10;
        var maxDistance = (req.query.maxDistance || 8) / geo.earthRadius;
        var minDistance = req.query.minDistance || 0;

        var p1 = { lat: req.query.lat, lng: req.query.lng };

        // find a location
        Location.find({
            loc: {
                $within: {
                    $centerSphere: [[p1.lng, p1.lat], maxDistance]
                }
            }
        }).limit(limit).exec(function(err, locations) {
            if (err) {
                return res.status(500).json(err);
            }
            var points = locations.map(function (location) {
                location = location.toObject();
                location.p = { lat: location.loc[1], lng: location.loc[0] };
                location.distance = geo.distance(p1, location.p);
                return location;
            }).filter(function (point) {
                return point.distance >= minDistance;
            });
            res.json(points);
        });
    } else {
        return res.status(500).json({
            error: 'Missing query parameters'
        });
    }
});

app.get('/all', function(req, res) {
    // Retrieve all locations
    Location.find({}).exec(function(err, locations) {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(locations);
    });
});

app.delete('/place/:id', function(req, res) {
    if('id' in req.params) {
        Location.remove({_id: req.params.id},
            function (err) {
                if(err) {
                    return res.status(500).json({
                        error: 'Unable to perform the query'
                    });
                }
                return res.json({
                    ok: 'query performed succesfully'
                });
            }
        )
    } else {
        return res.status(500).json({
            error: 'Missing id parameter'
        });
    }
});

app.put('/place', function(req, res) {
    if('id' in req.body) {
        var id = req.body.id;
        var update = {};
        if('description' in req.body) { update.description = req.body.description; }
        if('image' in req.body) { update.image = req.body.image; }
        if('lat' in req.body && 'lng' in req.body) { update.loc = [req.body.lng, req.body.lat]; }
        Location.update(
            {_id: req.body.id}, update,
            { multi: false },
            function (err) {
                if(err) { return res.status(500).json({ error: 'Unable to perform the query' }); }
                return res.json({ ok: 'query performed succesfully' });
            }
        )
    } else { return res.status(500).json({ error: 'Missing id parameter' }); }
});

app.post('/place', function(req, res) {
    var place = new Location({
        description: req.body.description,
        flagged: 0,
        image: req.body.image,
        loc: [req.body.lng, req.body.lat]
    });
    place.save();
    res.json({ result: 'ok' });
});

app.post('/flagged', function(req, res) {
    if('id' in req.body) {
        var id = req.body.id;
        Location.update(
            {_id: req.body.id},
            { $inc: { flagged: 1 }},
            { multi: false },
            function (err, numChanged) {
                if(err) {
                    return res.status(500).json({
                        error: 'Unable to perform the query'
                    });
                }
                return res.json({
                    ok: 'query performed succesfully'
                });
            }
        )
    } else {
        return res.status(500).json({
            error: 'Missing id parameter'
        });
    }
});

var server = app.listen(3000,function(){
    console.log("We have started our server on port 3000");
});