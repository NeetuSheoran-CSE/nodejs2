const express = require("express");

const {connection,userModel} = require("./db");

// step 2 - app creation
const app = express();

//API / routes
app.get("/",(req,res)=>{
    res.send({msg:"welcome"})
});


app.listen(8080,async() => {
    try{
        await connection;
        console.log("DB connected");
    }catch(error){
        console.log("error");
    }
    console.log("server started")
}
)