const jwt = require('jsonwebtoken');
const JWT_SECRET = '123456789'; // Use the same secret key from earlier

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  const token = authHeader.split(' ')[1]; // Split to remove 'Bearer' prefix
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: Invalid Token Format' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = { authenticateToken };