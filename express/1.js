// express js is web framework of node js

//step -1 install express
//step -2 npm i express
//step -3 import karo
//step -4 use
//step -5 node filemane [run file]
//

//step-1 import express module
const express = require("express");

//step-2 create application via express
const app = express();

//step-4 routes/api
app.get("/",(req,res)=>{
    res.send("welcome to express server");
})

app.get("/home",(req,res)=>{
    res.send("home page");
})

//step-3 
app.listen(8080,()=>{
console.log("server started");
})


//JSON- js Object Notation -universal data transmation format