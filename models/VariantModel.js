const mongoose = require("mongoose");

const variantSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Option name is required"],
        trim:true
    },
    values:[
            {
                value:{
                    type:String,
                    required:[true,"Option value is required"]
                }
            }
    ],
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
    },

})
module.exports = mongoose.model("Variant",variantSchema);