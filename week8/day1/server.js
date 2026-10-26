const express = require('express');

const {connection} = require("./db");

const app = express();

app.use("/user",userRouter);

app.get('/home', (req, res) => {
  res.send('Welcome to the Note Application');
});

app.listen(8080,async () => {
    try{
        await connection;
        console.log("DB connected");
    }catch(err){
        console.log("error");
    }
  console.log('Server started');
});