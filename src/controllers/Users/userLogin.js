const Users = require('../../models/usersSchema'); // Ensure this is the correct model import
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Add bcryptjs for password hashing (if you're using hashed passwords)

const JWT_SECRET = '123456789'; // Make sure to use the same secret in the authentication middleware

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all credentials!' });
  }
  try {
    // Check if user exists
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    // Verify password (assuming the password is hashed in the database)
    // const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // Generate JWT token
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(200).json({
      message: 'Login successful',
      token: token, // Send token to client
      user: existingUser // Optionally, send user data (excluding sensitive data)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { userLogin };
