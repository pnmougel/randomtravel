var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    description: String,
    flagged: Number,
    image: String,
    loc: {
        type: [Number],
        index: '2d'
    }
});

module.exports = mongoose.model('Location', LocationSchema);
