const jwt = require('jsonwebtoken');
const Users = require("../../models/usersSchema");

const generateToken = async (req, res) => {
    const { secret, key, userId } = req.body;
    if (!secret || !key || !userId) {
        return res.status(400).json({ message: "secret, key, and eamil are required" });
    }

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1m' });
        res.status(200).json({ message: "Success", token: token });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ message: "Error generating token", error: error.message });
    }
};

module.exports = { generateToken };