const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_);
  } catch (error) {
    console.log("Failed to connect", error);
  }
};

module.exports = { connectDb };
