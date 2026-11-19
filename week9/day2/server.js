//npm init -y,npm i express socket.io
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const httpserver = http.createServer(app);

const io = new Server(httpserver);

let count = 0;

io.on('connection',(socket)=>{
    count++;
    console.log("Active User:", count); //terminal/backend
    
    socket.emit("active", count); //frontend/client

    console.log("Connected Established");

    socket.emit("chat","hello from server side");

    //to broadcast a message
    socket.broadcast.emit("join","New User Joined");

    socket.on("msg",(cb)=>{
        console.log(cb);
    });

    //handling discount event
    socket.on("discount",()=>{
        count--;
        console.log("Active User: ",count); //terminal/backend
    });
    //for making announcement
    io.emit("announce","Only 5hr class left");
});

httpserver.listen (8080,()=>{
    console.log("server started")
});