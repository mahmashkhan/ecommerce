const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')

const adminLogin = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { name, email, password };

  // Load existing users from the users.json file
  let users = [];
  const usersFilePath = path.join(__dirname, '../users.json');

  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    users = JSON.parse(data);
  } catch (error) {
    console.log('Error reading users file or file does not exist, starting fresh.');
    users = [];
  }

  const isUserExist = users.some(user => user.email === email);
  
  if (isUserExist) {
    return res.status(500).json({ message: 'User already exists' });
  } else {
    users.push(newUser);

    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
      return res.status(500).json({ message: 'Error saving new user' });
    }

    res.json({ message: 'User registered successfully', newUser });
  }
};


module.exports = adminLogin;
