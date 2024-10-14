const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.Controller');

// Create a doctor
router.post('/', doctorController.createDoctor);

// Get all doctors
router.get('/', doctorController.getAllDoctors);

// Get doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Get doctors by hospital
router.get('/hospital/:hospitalId', doctorController.getDoctorsByHospital);

// Update a doctor
router.put('/:id', doctorController.editDoctor);

// Delete a doctor
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
