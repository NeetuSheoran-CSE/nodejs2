const express = require("express");
const fs = require("fs");

const{studentRouter} = require("./routes/student.route");
const{trainerRouter} = require("./routes/trainer.route");

const app = express();

//USING MIDDLEWERE
app.use("/student", studentRouter);
app.use("/trainer", trainerRouter);

app.get("/", (req, res) => {
    console.log({ msg: "Home Page" });
});

app.listen(8080, () => {
    console.log("server is running on port 8080");
});