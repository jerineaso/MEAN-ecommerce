const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    addressLine1: { 
        type: String, 
        required: [true, 'Address Line 1 is required'] 
    },
    addressLine2: {
        type: String,
        required: [true, 'Address Line 2 is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    postalCode: {
        type: String,
        required: [true, 'Postal Code is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    }
});

module.exports = mongoose.model('UserAddress', userAddressSchema);