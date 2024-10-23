const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   name: String,
   email: { type: String, required: true, unique: true }, // Ensure email is unique
   password: String,
   birthdate: Date,
   address: String,
   allergies: [{ type: String }],  // Fix allergies to be an array of strings
   medicalTips: String,
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel