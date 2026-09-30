const mongoose = require("mongoose");

//step2 - build connection with DB
const connection = mongoose.connect("mongodb://127.0.0.1:27017/randondb");

//step 3 - buils Schema/structure
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  Password: String, 
});

const userModel = mongoose.model("user",userSchema);

module.exports = {connection,userModel}