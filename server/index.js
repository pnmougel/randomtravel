
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

app.post('/place', function(req, res) {
    console.log('Received request');
    var place = new Location({
        description: req.body.description,
        flagged: 0,
        image: req.body.image,
        loc: [req.body.lng, req.body.lat]
    });
    place.save();
    res.json({ result: 'ok' });
});

var server = app.listen(3000,function(){
    console.log("We have started our server on port 3000");
});