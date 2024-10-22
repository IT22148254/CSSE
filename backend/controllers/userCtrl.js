const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs');

const loginController = () => {}

//register call back
const registerController = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email:req.email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' , success:false});
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message: 'Register Sucessfully', success: true })
    } catch {
        console.log(error);
        res.status(500).send({success:false, message: `Register Controller  error ${error.message}` });
    }

}
module.exports = { registerController, loginController };
