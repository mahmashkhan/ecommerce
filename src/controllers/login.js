const adminUser = require('../models/adminUser'); // Ensure this is the correct model import

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all credentials!' });
  }

  try {
    // Check if admin exists
    const existingAdmin = await adminUser.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // Verify password (assuming the password is hashed in the database)
    // const isPasswordValid = await existingAdmin.matchPassword(password); // Define `matchPassword` in your model
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    // If successful, send success response
    res.status(200).json({ message: 'Login successful', admin: existingAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { adminLogin };