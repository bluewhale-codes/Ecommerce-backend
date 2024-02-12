const mongoose = require("mongoose");
const subcatagorytypeSchema = mongoose.Schema({
    
    subcatagorytypename:{
        type:String,
        required:[true,"Please Enter sub-catagory type-Name"]
    },

    unitvalue:[
        {
            unitname:{
                type:String,
                required:true
            },
            unitsign:{
                type:String,
                required:true
            }
        }
    ],

    catagorytype:{
        type:mongoose.Schema.ObjectId,
        ref:"CatagoryType",
        require:true
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

module.exports = mongoose.model("SubCatagoryType",subcatagorytypeSchema)