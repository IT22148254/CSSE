const mongoose = require("mongoose");

// Define the schema for the appointment
const appointmentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^(\+?[1-9]\d{1,14}$|^0\d{9,10}$)/.test(v); // E.164 international format and local
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  doctor: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      "Consultation",
      "Follow-up",
      "Routine Check-up",
      "Emergency",
      "Other",
    ],
    default: "Consultation",
  },
  status: {
    type: String,
    enum: ["completed", "not completed"],
    default: "not completed", // Default value
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
