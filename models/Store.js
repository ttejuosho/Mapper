const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Please add a store Id'],
        unique: true,
        trim: true,
        maxlength: [10, 'Store Id must be less than 10 Characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            // required: true
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

StoreSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    // Dont save add in db
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Store', StoreSchema);
