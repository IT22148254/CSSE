const mongoose = require("mongoose");
const { Schema } = mongoose;

const hospitalSchmema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
  },
  hotline: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const hospital = mongoose.model("hospital", hospitalSchmema);
module.exports = hospital;
