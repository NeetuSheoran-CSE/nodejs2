const express = require("express");

const { connection } = require("./db");
const { userRouter } = require("./route/user.route");

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/home", (req, res) => {
  res.send("Welcome to the Note Application");
});

// auth middlewere
app.use(auth);

//private route
app.get("/dashboard",(req,res)=>{
  res.send({msg:"Welcome to Note Application"});
})
app.listen(8080, async () => {
  try {
    await connection;
    console.log("DB connected");
  } catch (err) {
    console.log("DB connection failed:", err.message);
  }
  console.log("Server started");
});
