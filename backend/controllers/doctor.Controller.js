const Doctor = require("../models/doctor.Model");

// @desc    Create a new doctor
// @route   POST /api/doctors
exports.createDoctor = async (req, res) => {
  try {
    const {
      hospital,
      firstName,
      lastName,
      titles,
      email,
      specialisation,
      profilePic,
    } = req.body;

    // Check if doctor with the same email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor with this email already exists" });
    }

    const doctor = new Doctor({
      hospital,
      firstName,
      lastName,
      titles,
      email,
      specialisation,
      profilePic,
    });

    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get a doctor by ID
// @route   GET /api/doctors/:id
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("hospital");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor by ID: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get doctors by hospital
// @route   GET /api/doctors/hospital/:hospitalId
exports.getDoctorsByHospital = async (req, res) => {
  try {
    const doctors = await Doctor.find({ hospital: req.params.hospitalId });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors by hospital: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Edit a doctor
// @route   PUT /api/doctors/:id
exports.editDoctor = async (req, res) => {
  try {
    const {
      hospital,
      firstName,
      lastName,
      titles,
      email,
      specialisation,
      profilePic,
    } = req.body;

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update doctor fields
    doctor.hospital = hospital || doctor.hospital;
    doctor.firstName = firstName || doctor.firstName;
    doctor.lastName = lastName || doctor.lastName;
    doctor.titles = titles || doctor.titles;
    doctor.email = email || doctor.email;
    doctor.specialisation = specialisation || doctor.specialisation;
    doctor.profilePic = profilePic || doctor.profilePic;

    const updatedDoctor = await doctor.save();
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor removed" });
  } catch (error) {
    console.error("Error deleting doctor: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all doctors
// @route   GET /api/doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("hospital");
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
