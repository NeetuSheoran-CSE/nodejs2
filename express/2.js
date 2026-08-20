
//step-1 npm i nodemon
// step-2 package.json
// "server":"nodemon fn"
// step-3 npm eun server

const express = require("express");
const app = express();
const fs = require("fs");

//routes
app.get("/",(req,res) => {
    res.send({msg:"Welcome to krmu application"});
});

app.get("/about",(req,res) => {
    res.send({msg:"Welcome to about page"});
});

app.get("/login",(req,res) => {
    res.send({msg:"Welcome to login page"});
});

//read all data [GET method]
app.get("/stread",(req,res)=>{
    const data = fs.readFileSync("./krmu.json","utf-8");
    //console.log(data, typeof data);

    const jsdata = JSON.parse(data);
    console.log(jsdata, typeof jsdata);

    res.send(jsdata.trainer);
});



//read all data [GET method]
app.get("/tread",(req,res)=>{
    const data = fs.readFileSync("./krmu.json","utf-8");
    //console.log(data, typeof data);

    const jsdata = JSON.parse(data);
    //console.log(jsdata, typeof jsdata);

    res.send(jsdata.student);
});



app.get("/data",(req,res) => {
    res.send("data fetch successful");
});

app.listen(8080,()=>{
    console.log("server started")
})