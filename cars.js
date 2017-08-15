const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true},
    year: {type: Number},
    doors: {type: Number},
    image: {type: String},
    features: {
        color: { type: String, default: 1 },
        automatic: {type: String}
    }
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
