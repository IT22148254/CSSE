const express = require("express");
const {
  createAppointment,
  getAppointments,
  getAppointment,
  deleteAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

// get all appointments
router.get("/", getAppointments);

// get a single appointment
router.get("/:id", getAppointment);

// create a new appointment
router.post("/", createAppointment);

// delete a single appointment
router.delete("/:id", deleteAppointment);

// update a single appointment
router.patch("/:id", updateAppointment);

module.exports = router;
