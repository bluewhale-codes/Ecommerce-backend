const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwt");
const JWT_SECRET = "ecomm9855@#PRIVATE";
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary')


exports.resiterUserTest = catchAsyncErrors(async(req,res,next)=>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{folder:'Avatars',width:150,crop:'scale'})

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt); 
  
    const user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
        avatar:{
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    const data = {
         userD:user,
         user:{
             id:user.id
         }
    }
    sendToken(data,JWT_SECRET,200,res);

    res.status(200).json({
        success:true,
        message:req.user.password
    })
})
// Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
   
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{folder:'Avatars',width:150,crop:'scale'})
    
    
   
    const user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        // avatar:{
        //     public_Id:myCloud.public_id,
        //     url:myCloud.secure_url
        // }
    });
    // const data = {
    //     userD:user,
    //     user:{
    //         id:user.id
    //     }
    // }
    

//    sendToken(data,JWT_SECRET,200,res);

    

});

//Login User
exports.loginUser = async(req,res,next)=>{
    const {email,password} = req.body;

    // check user given password and email both
    if(!email || !password){
        return next(new ErrorHander("Please Enter Email or password",400))
    }

    let user = await User.findOne({email}).select('+password');
    
    if(!user){
        return next(new ErrorHander('Invalid email or password',401))
    }

    const isPasswordMatched = await user.camparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander('Invalid password',401))
    }

    const data = {
        userD:user,
        user:{
            id:user.id
        }
    }
    sendToken(data,JWT_SECRET,200,res);

}

//Logout User
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'You are Logged out'
    })
})

// Forget password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHander('User not found',404))
    }

    // Get ResetPasswordToken
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    //const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/products/reset/${resetToken}`
    const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;
    const message = `Your Password reset token :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore it`;

    try {
        
        await sendEmail({
            email:user.email,
            subject:`Ecommerce password recovery`,
            message
        })
        res.status(200).json({
            success:true,
            message:"Email sent"
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})

        return next(new ErrorHander(error.message,500));
    }
})

// Reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    
   const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

   const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
   })
   
   if(!user){
        return next(new ErrorHander('Reset Password Token is invalid or has been expire',400))
   }

   if(req.body.password !== req.body.confirmPassword){
     return next(new ErrorHander('Password does not match',400))
   }
   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password,salt); 
   user.password = secPass;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;
   await user.save();
   const data = {
        userD:user,
        user:{
            id:user.id
        }
    }
    sendToken(data,JWT_SECRET,200,res);
})

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

// Update password
exports.UpdatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.camparePassword(req.body.oldpassword);
    if(!isPasswordMatched){
        return next(new ErrorHander('Old password is incorrect',404))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander('Password not matched',400));
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.newPassword,salt); 
    user.password = secPass;
    await user.save();
    
    res.status(200).json({
        success:true,
        message:"Your password has been changed"
        
    })
})

// Update Profile
exports.UpdateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_Id;
        await cloudinary.v2.uploader.destroy(imageId)

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{folder:'Avatars',width:150,crop:'scale'})

        newUserData.avatar = {
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        }
    }


    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    

    res.status(200).json({
        success:true,
        message:"Your Profile has been Updated",
        user
        
    })
})

// Get all users (Admin);
exports.getAllusers = catchAsyncErrors(async(req,res,next)=>{

   const users = await User.find();
   const userCount = await User.countDocuments();
   res.status(200).json({
    success:true,
    userCount,
    users
   })
    
})
// Get single user (--Admin);
exports.getSingleuser = catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHander("user does not exist",404));
  }
  res.status(200).json({
    success:true,
    user
  })
    
})

// Update role -- Admin
exports.UpdateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {

        role:req.body.role
    }


    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    

    res.status(200).json({
        success:true,
        message:"Your Profile with role has been Updated",
        user
        
    })
})


// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
   
    let user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHander('User does not exits'));
    }
   
    const imageId = user.avatar.public_Id;
    await cloudinary.v2.uploader.destroy(imageId)

    
    user = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        message:"Your Giver user has been removed",
    
        
    })
})
