const mongoose = require("mongoose");
const catagorytypeSchema = mongoose.Schema({
    
    catagorytypename:{
        type:String,
        required:[true,"Please Enter catagory type-Name"]
    },
    
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    
    catagory:{
        type:mongoose.Schema.ObjectId,
        ref:"Catagory",
        require:true
    },
  
    
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("CatagoryType",catagorytypeSchema)