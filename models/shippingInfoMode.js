const mongoose = require('mongoose');

const shippingInfoSchema = new mongoose.Schema({
    shippingInfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pinCode:{type:Number,required:true},
        phoneNo:{type:Number,required:true}
    },
    
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})
module.exports = mongoose.model('shippingINFO',shippingInfoSchema)