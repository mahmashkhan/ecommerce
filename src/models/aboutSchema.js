const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema(
  {
    aboutUs: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('About', aboutUsSchema);
