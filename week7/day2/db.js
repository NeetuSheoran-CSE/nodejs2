// require("dotenv").config();

// // step -1 import
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number,
//   status: Boolean,
// },{
//     versionKey:false
// });

// const userModel = mongoose.model("user", userSchema);

// const main = async () => {
//   // step -2 build connection
//   await mongoose.connect(process.env.mongourl);
//   console.log("DB connected");

//   //   step -4 create document
//   await userModel.insertOne({
//     name: "prachi",
//     email: "prachi@gmail.com",
//     age: 17,
//     status: true,
//   });
//   console.log("Data created successfully");

// //   step -5 read

// const user = await userModel.find();
// console.log(user);


//   //   step - 3 disconnect connection
//   //   mongoose.disconnect();
//   //   console.log("Connected Deleted");
// };

// main();

require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.mongourl)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });





