const mongoose = require('mongoose');

module.exports = async function connection() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Connected to database.');
  } catch (error) {
    console.log(error);
    console.log('Could not connect to database.');
  }
};
