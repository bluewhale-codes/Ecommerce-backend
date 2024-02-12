const mongoose = require("mongoose");

const couponsSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the coupons name"],
        trim:true
    },
    
    couponDescription:{
        type:String,
        required:[true,"Please Enter Coupon Description"] 
    },
    
    couponValue:{
        type:Number,
        required:[true,"Please Enter coupon value"],
        maxLength:[8,"Price cannot exceed 8 character"]
    },

    couponExpireDate:{
        type:Date,
        required:[true,"Please Enter Coupon expiry date"],
        
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Coupons",couponsSchema)