const Appointment = require("../models/appointmentModel");
const mongoose = require("mongoose");
// get all appointments
const getAppointments = async (req, res) => {
  const appointments = await Appointment.find({}).sort({ createdAt: -1 });
  res.status(200).json(appointments);
};

// get a single appointment
const getAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Appointment not found" });
  }

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }
  res.status(200).json(appointment);
};

// create a new appointment
const createAppointment = async (req, res) => {
  const { userName, contactNumber, age, doctor, date, time, category } =
    req.body;
  try {
    const appointment = await Appointment.create({
      userName,
      contactNumber,
      age,
      doctor,
      date,
      time,
      category,
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a single appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  const appointment = await Appointment.findOneAndDelete({ _id: id });

  if (!appointment) {
    return res.status(400).json({ message: "Appointment not found" });
  }
  res.status(200).json(appointment);
};

// update a single appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Appointment not found" });
  }

  const appointment = await Appointment.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!appointment) {
    return res.status(400).json({ message: "Appointment not found" });
  }
  res.status(200).json(appointment);
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  deleteAppointment,
  updateAppointment,
};
