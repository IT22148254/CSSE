const mongoose = require('mongoose');
const { Schema } = mongoose;

const availableTimesSchema = new Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', 
        required: true
    },
    availableTimes: [
        {
            date: {
                type: String,
                required: true,
                validate: {
                    validator: function(v) {
                        return /^\d{2}\/\d{2}\/\d{4}$/.test(v);
                    },
                    message: props => `${props.value} is not a valid date format!`
                }
            },
            times: {
                type: [String],  
                required: true
            },
            available: {
                type: Boolean,
                default: true  
            }
        }
    ]
});

const AvailableTimes = mongoose.model('AvailableTimes', availableTimesSchema);

module.exports = AvailableTimes;
