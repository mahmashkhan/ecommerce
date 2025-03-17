const adminUser = require('../models/adminUser'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = '03089287440';

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all credentials!' });
  }

  try {
    const existingAdmin = await adminUser.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: 'User does not exist' });
    } 

    const token = jwt.sign({ userId: existingAdmin._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token: token, admin: existingAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { adminLogin };
