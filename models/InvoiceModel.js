const mongoose = require('mongoose');
const validator = require("validator");

const invoiceSchema = new mongoose.Schema({
    companyinfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pinCode:{type:Number,required:true},
        phoneNo:{type:Number,required:true}
    },
    companyEmail:{
        type:String,
        required:[true,"Please Enter company Business Email"],
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    companyBankDetail:{
        account:{type:String,required:true},
        bank:{type:String,required:true},
        accnumber:{type:Number,required:true},
        branch:{type:String,required:true},
        ifcode:{type:String,require:true}
    },
    shippingInfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pinCode:{type:Number,required:true},
        phoneNo:{type:Number,required:true}
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:'Product',
                required:true
            },
        }
    ],
    Seller:{
        type:String,
        required:true
    },
    
     user:{
         type:mongoose.Schema.ObjectId,
         ref:"User",
         required:true
     },
     order:{
        type:mongoose.Schema.ObjectId,
        ref:"Order",
        unique: true,
     },
    
    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
    },
    
    totalMRP:{
        type:Number,
        default:0,
        required:true,
    },
    shippingPrice:{
        type:Number,
        default:0,
        required:true,
    },
    couponDiscount:{
        type:Number,
        default:0,
        required:true,
    },
    subTotal:{
        type:Number,
        default:0,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})
module.exports = mongoose.model('Invoice',invoiceSchema)