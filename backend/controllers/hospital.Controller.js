const Hospital = require('../models/hospital.Model'); 


// Error handler utility function
exports.handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({ success: false, message: 'Server Error', error });
};

// Get all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    return res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    return handleError(res, error);
  }
};

// Get hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    return res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    return handleError(res, error);
  }
};

// Create a new hospital
exports.createHospital = async (req, res) => {
  const { name, city, address, pic, hotline, email, password } = req.body;

  try {
    // Check if hospital email already exists
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ success: false, message: 'Hospital with this email already exists' });
    }

    const newHospital = new Hospital({
      name,
      city,
      address,
      pic,
      hotline,
      email,
      password
    });

    await newHospital.save();
    return res.status(201).json({ success: true, data: newHospital });
  } catch (error) {
    return handleError(res, error);
  }
};

// Edit an existing hospital
exports.editHospital = async (req, res) => {
  const { name, city, address, pic, hotline, email } = req.body;

  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    // Update hospital details
    hospital.name = name || hospital.name;
    hospital.city = city || hospital.city;
    hospital.address = address || hospital.address;
    hospital.pic = pic || hospital.pic;
    hospital.hotline = hotline || hospital.hotline;
    hospital.email = email || hospital.email;

    await hospital.save();
    return res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    return handleError(res, error);
  }
};

// Delete a hospital by ID
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    return res.status(200).json({ success: true, message: 'Hospital deleted successfully' });
  } catch (error) {
    return handleError(res, error);
  }
};

// Hospital login
exports.loginAsHospital = async (req, res) => {
    const { email, password } = req.body;

    try {
      const hospital = await Hospital.findOne({ email });
      if (!hospital || hospital.password !== password) {
        return res.status(404).json({ success: false, message: 'Invalid email or password' });
      }
  
      return res.status(200).json({ success: true, message: 'Login successful', data: hospital });
    } catch (error) {
      return handleError(res, error);
    }
};
