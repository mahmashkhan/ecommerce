const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: string, required: true },
    email: { type: string, required: true },
    password: { type: string, required: true },
})

module.exports = mongoose.Model(userSchema, 'user')                   