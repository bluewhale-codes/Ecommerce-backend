const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter a Valid name"],
        maxLength:[30,"Name cannot exceed 30 character"],
        minLength:[4,"Name should be more than 4 character"],
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Business Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    companyAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pinCode:{type:Number,required:true},
        phoneNo:{type:Number,required:true}
    },
    companyBankDetail:{
        account:{type:String,required:true},
        bank:{type:String,required:true},
        accnumber:{type:Number,required:true},
        branch:{type:String,required:true},
        ifcode:{type:String,require:true}
    },
    

   createdAt:{
    type:Date,
    default:Date.now
   },
})




module.exports = mongoose.model('CompanyInfo',companySchema)