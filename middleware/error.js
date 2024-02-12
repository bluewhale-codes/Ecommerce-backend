const { TokenExpiredError } = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");

module.exports = (err,req,res,next)=>{
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal server error";


    // cast erorr;
    if(err.name==="CastError"){
      const message = `Resource not found. Invalid ${err.path}`;
      err = new ErrorHander(message,400);
    }

    //Mongoose Duplicate Error
    if(err.code === 11000){
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
      err = new ErrorHander(message,400);
    }
  
    // Json web token error
    if(err.name === "JsonWebTokenError"){
      const message = "Json Web Token is Invalid, Try again"
      err = new ErrorHander(message,400);
    }

    // Json Expire Error
    if(err.code === TokenExpiredError){
      const message = 'Json Web Token is Expire, Try again'
      err = new ErrorHander(message,400);
    }

   res.status(err.statusCode).json({ 
      success:false,
      message:err.message,
   });
};