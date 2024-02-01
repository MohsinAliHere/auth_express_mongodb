const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema({
  username: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model("auth", authSchema);
