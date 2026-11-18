//npm init -y,npm i express socket.io
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const httpserver = http.createServer(app);

const io = new Server(httpserver);

io.on('connection',(socket)=>{
    console.log("user connected");

    socket.emit("chat","hello from server side");

    socket.on("msg",(cb)=>{
        console.log(cb);
    });
});

app.listen (8080,()=>{
    console.log("server started")
});