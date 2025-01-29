const User = require("../models/usersSchema");

const deleteUser = async (req, res) => {
    const { id } = req.params
    const userDelete = await User.findByIdAndDelete(id)
    if (userDelete) {
  res.status(200).json({message: `Success! User deleted `})
    }
    else{
        res.status(400).json({message: `Unable to delete user :(`})
    }
}
module.exports = {deleteUser}