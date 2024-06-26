const mongoose = require("mongoose");

const userSchame = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
});

const Users = mongoose.model("User", userSchame);

module.exports = Users;
