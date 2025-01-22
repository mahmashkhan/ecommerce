const Users = require('../../models/usersSchema')
const userSignup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
        return res.status(400).json({ message: "All fields required" })
    }
    const userExist = await Users.findOne({ email })
    if (userExist) {
        res.status(400).json({ message: "User Already exist" })
    }
    else {
        const newAdmin = new Users({ name, email, password })
        await newAdmin.save()
        res.status(201).json({ message: "Success! Account created " , userId: Users._id })
    }
}
module.exports = { userSignup }
