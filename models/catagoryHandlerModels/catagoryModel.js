const mongoose = require("mongoose");
const catagorySchema = mongoose.Schema({
    
    catagory:{
        type:String,
        required:[true,"Please Enter catagory"]
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

module.exports = mongoose.model("Catagory",catagorySchema)