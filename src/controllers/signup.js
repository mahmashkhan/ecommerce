
const adminUser = require('../models/adminUser')
const adminSignup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        return res.status(400).json({ message: "All fields required" })
    }
    const adminExist =  await adminUser.findOne({email})
    if (adminExist){
        res.status(400).json({message:"User Already exist"})
    }
    else{
        const newAdmin = new adminUser({name, email, password })
        await newAdmin.save()
        res.status(201).json({message: "Success! ,user created"})
    }
}
module.exports = {adminSignup}
