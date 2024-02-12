const { text } = require("body-parser");
const mongoose = require("mongoose");
const productDiscountSchema = mongoose.Schema({
    
    sdPrice:{
        type:Number,
        default:0,
        maxLength:[8,"Price cannot exceed 8 character"]
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
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

module.exports = mongoose.model("ProductDiscount",productDiscountSchema)