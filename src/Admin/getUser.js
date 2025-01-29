const User = require('../models/usersSchema')

//Get User
const getUser = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}
//Get User By Id
const getUserById = async (req, res) =>{
    const  {id  }= req.params
    const users = await User.findById(id)
    res.status(200).json(users)
}

module.exports = {getUser, getUserById}