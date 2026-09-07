const express = require("express");
const fs = require("fs");

//middlewere
const trainerRouter = express.Router();

trainerRouter.get("/read",(req,res) => {
    // Handle GET request for reading trainer data
    const data = JSON.parse(fs.readFileSync("./krmu.json", "utf-8"));
    res.send(data.trainer);
});

module.exports = {trainerRouter};