const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
});

const User = mongoose.model("User", userSchema, "user");
module.exports = User;
