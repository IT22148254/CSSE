const AvailableTimes = require("../models/availableTimes.Model");
const mongoose = require("mongoose");

/**
 * Get available times by doctor ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getAvailableTimesByDoctor = async (req, res) => {
  try {
    const times = await AvailableTimes.findOne({ doctor: req.params.doctorId });
    if (!times)
      return res
        .status(404)
        .json({ message: "No available times found for this doctor." });
    return res.status(200).json(times); // Return the available times object directly
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Create new available time
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.createAvailableTime = async (req, res) => {
  try {
    const availableTime = new AvailableTimes(req.body);
    const savedAvailableTime = await availableTime.save();
    return res.status(201).json(savedAvailableTime);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Get all available times
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getAllAvailableTimes = async (req, res) => {
  try {
    const availableTimes = await AvailableTimes.find();
    return res.status(200).json(availableTimes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Get available times by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getAvailableTimesById = async (req, res) => {
  try {
    const availableTime = await AvailableTimes.findById(req.params.id);
    if (!availableTime)
      return res.status(404).json({ message: "Available time not found." });
    return res.status(200).json(availableTime);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Delete available times by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.deleteAvailableTimes = async (req, res) => {
  try {
    const result = await AvailableTimes.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(404).json({ message: "Available time not found." });
    return res.status(200).json({ message: "Available times removed" }); // Adjusted message
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Update available times by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.updateAvailableTimes = async (req, res) => {
  try {
    const availableTime = await AvailableTimes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!availableTime)
      return res.status(404).json({ message: "Available time not found." });
    return res.status(200).json(availableTime);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Toggle the availability of available times
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.toggleAvailability = async (req, res) => {
  try {
    const { availableTimesId, timeId } = req.params;


    const availableTimesDoc = await AvailableTimes.findById(availableTimesId);
    if (!availableTimesDoc)
      return res.status(404).json({ message: "Available times not found." });

    const availableTime = availableTimesDoc.availableTimes.id(timeId);
    if (!availableTime)
      return res
        .status(404)
        .json({ message: "Available time entry not found." });


    availableTime.available =
      availableTime.available === true ? false : true;
    await availableTimesDoc.save();

    return res.status(200).json({ available: availableTime.available });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
