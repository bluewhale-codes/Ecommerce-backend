const { text } = require("body-parser");
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    
    description:{
        type:String,
        required:[true,"Please Enter Product Description"] 
    },
    
    dPrice:{
        type:Number,
        default:0,
        maxLength:[8,"Price cannot exceed 8 character"]
    },
    
    Price:{
         type:Number,
         required:[true,"Please Enter Product Price"],
         maxLength:[8,"Price cannot exceed 8 character"]
    },
    rating:{
        type:Number,
        default:0
    },
    
    images:[
        {
            public_Id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    catagory:{
        type:String,
        required:[true,"Please Enter Product catagory"]
    },
    Brand:{
        type:mongoose.Schema.ObjectId,
        ref:"Brands",
        default:'GENERAL'
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock not exceed 10000"],
        default:1
    },
    numOfReviews:{
       type:Number,
       default:0
    },
    review:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isDiscount:{
        type:Boolean,
        default:false,
        require:false
    },
    dpercentage:{
        type:Number,
        maxLength:[2,"percentage"],
        default:null,
        require:false
    }

})

module.exports = mongoose.model("Product",productSchema)