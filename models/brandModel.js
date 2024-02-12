const mongoose = require("mongoose");
const brandSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Brand Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Brand Description"] 
    },
    catagory:{
        type:String,
        required:[true,"Please Enter Brand catagory"]
    },

    logo:{
        
            
         public_Id:{
             type:String,
             required:true
         },
         url:{
             type:String,
             required:true
         }
    },
    
    images:[
           
        {public_Id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }}
    ],
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

module.exports = mongoose.model("Brands",brandSchema)