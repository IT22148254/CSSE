const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    titles: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    specialisation: {
        type: String,
        required: true,
        trim: true
    },
    profilePic: {
        type: String, 
        required: false
    }
}, {
    timestamps: true 
});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
