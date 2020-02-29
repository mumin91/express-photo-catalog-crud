const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var photoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    url: {
        type: String,
    }
}, {
    timestamps: true
});


var Photos = mongoose.model('Photo', photoSchema);

module.exports = Photos;