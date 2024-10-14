const express = require('express');
const availableTimesController = require('../controllers/availableTimes.Controller');

const router = express.Router();

// Route to get available times by doctor ID
router.get('/doctor/:doctorId', availableTimesController.getAvailableTimesByDoctor);

// Route to create new available times
router.post('/', availableTimesController.createAvailableTime);

// Route to get all available times
router.get('/', availableTimesController.getAllAvailableTimes);

// Route to get available times by ID
router.get('/:id', availableTimesController.getAvailableTimesById);

// Route to delete available times by ID
router.delete('/:id', availableTimesController.deleteAvailableTimes);

// Route to update available times by ID
router.put('/:id', availableTimesController.updateAvailableTimes);

// Route to toggle availability of available times
router.patch('/:availableTimesId/toggle/:timeId', availableTimesController.toggleAvailability);

module.exports = router;
