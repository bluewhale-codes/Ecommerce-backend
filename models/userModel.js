const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter a Valid name"],
        maxLength:[30,"Name cannot exceed 30 character"],
        minLength:[4,"Name should be more than 4 character"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
     password:{
         type:String,
         required:[true,"Please Enter a password"],
         minLength:[8,"Password should be more than 8 character"],
         select:false

     },
     avatar:{
             public_Id:{
                 type:String,
                 required:true
             },
             url:{
                 type:String,
                 required:true
             }
    },
    role:{
     type:String,
     default:"user"
    },
   createdAt:{
    type:Date,
    default:Date.now
   },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

// compare password
userSchema.methods.camparePassword = async function(enteredPassword){
     return await bcrypt.compare(enteredPassword,this.password)
}

// Generating Password reset token
userSchema.methods.getResetPasswordToken =  function(){
    
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hashing and adding resetPasswordToken to userSchema;
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
};


module.exports = mongoose.model('User',userSchema)