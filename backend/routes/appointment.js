const express = require("express");

const router = express.Router();

// get all appointments
router.get("/", (req, res) => {
  res.json({ message: "Get all appoinments" });
});

// get a single appointment
router.get("/:id", (req, res) => {
  res.json({ message: "Get a single appointment" });
});

// create a new appointment
router.post("/", (req, res) => {
  res.json({ message: "Post a new appointment" });
});

// delete a single appointment
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete a appointment" });
});

// update a single appointment
router.patch("/:id", (req, res) => {
  res.json({ message: "Update a appointment" });
});

module.exports = router;
