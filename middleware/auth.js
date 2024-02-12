const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('./catchAsyncErrors')
const {body, validationResult} = require('express-validator')
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ecomm9855@#PRIVATE";
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{

    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHander("Please login to access this resource",401))
    }

    const decodedData = jwt.verify(token,JWT_SECRET);
    console.log(decodedData);
    
    req.user = await User.findById(decodedData.user.id);
    next();
})
exports.authorizeRoles = (...roles)=>{
     return (req,res,next)=>{
         if(!roles.includes(req.user.role)){
            return next(new ErrorHander(`Role:${req.user.role} is not allowed to access this resource`,403))
         };
        
         next();
     };
};

// exports.isPassword = catchAsyncErrors(async (req,res,next)=>{

//     const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
//     let password = req.body.password;
    
//     let result = password.match(pattern);

//    if(!result){
//        return next(new ErrorHander("Your Password is Week",403))
//    }
//    next();
      
    
// });
exports.isPassword = catchAsyncErrors(async (req,res,next)=>{

       const a =req.body.avatar;
       return next(new ErrorHander(`${a.split(":")[1]}`,403))
 
      
    
});
exports.createAuthentication = catchAsyncErrors(async (req,res,next)=>{

 const errors = validationResult(req)

     errors.array().map((item)=>{
        return next(new ErrorHander(`${item.msg}`,403))
     })
    

 
 next();
      
    
});


