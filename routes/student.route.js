const express = require("express");
const fs = require("fs");

//middlewere
const studentRouter = express.Router();

studentRouter.get("/read",(req,res) => {
    // Handle GET request for reading student data
    const data = JSON.parse(fs.readFileSync("./krmu.json", "utf-8"));
    res.send(data.student);
});
module.exports = {studentRouter};