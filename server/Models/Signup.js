const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  profession: {type: String, required: true},
  location: {type: String, required: true},
  password: { type: String, required: true },
  confirmPassword: {type:String, required: true},
});

const Signup = mongoose.model("Signup", SignupSchema);

module.exports = Signup;
