var distance = function (p1, p2) {
    var latR1 = toRadians(p1.lat);
    var latR2 = toRadians(p2.lat);
    var delta1 = toRadians(p2.lat - p1.lat);
    var delta2 = toRadians(p2.lng - p1.lng);

    var a = Math.sin(delta1/2) * Math.sin(delta1/2) +
        Math.cos(latR1) * Math.cos(latR2) *
        Math.sin(delta2/2) * Math.sin(delta2/2);
    return (earthRadius * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))));
};
var earthRadius = 6378.137;

var toRadians = function (degrees) {
    return degrees * Math.PI / 180;
};

module.exports = {
    distance: distance,
    earthRadius: earthRadius
};
