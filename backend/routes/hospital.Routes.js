const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital.Controller');

// Create a hospital
router.post('/', hospitalController.createHospital);

// Get all hospitals
router.get('/', hospitalController.getAllHospitals);

// Get hospital by ID
router.get('/:id', hospitalController.getHospitalById);

// Update a hospital
router.put('/:id', hospitalController.editHospital);

// Delete a hospital
router.delete('/:id', hospitalController.deleteHospital);

//log in to hospital
router.post('/login',hospitalController.loginAsHospital);

module.exports = router;