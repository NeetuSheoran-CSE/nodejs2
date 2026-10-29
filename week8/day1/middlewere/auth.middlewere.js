const jwt = require("jsonwebtoken");
const auth = (req,res,next)=>{

    //logic
    try{
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token,"coding");
        next();
    }catch(err){
        res.send({msg:"login first"})
    }
};

module.exports = {auth};