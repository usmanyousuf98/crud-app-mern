const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const users = new Schema({
  username: { type: String, required: true, min: 5, max: 50 },
  customerName: { type: String, required: true, min: 5, max: 50 },
  email: { type: String, required: true, min: 5, max: 50 },
  profilePic: {
    type: String,
    required: true,
  },
});

const usersSchema = model("users", users);

module.exports = usersSchema;
