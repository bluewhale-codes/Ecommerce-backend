const mongoose = require("mongoose");
const newProductSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter Product title"],
        trim:true
    },
    
    description:{
        type:String,
        required:[true,"Please Enter Product Description"] 
    },
    
    
    catagory:{
        type:String,
        required:[true,"Please Enter Product catagory"]
    },
    productType:{
        type:String,
        required:[true,"Please Enter Product type"]
    },
    productTag:[
        {
            Tag:{
                type:String,
                required:[true,"Please Enter Product Tag"]
            }
        }
    ],
    
    AllStock:{
        type:Number,
        maxLength:[4,"Stock not exceed 10000"],
        default:1
    },
    numOfReviews:{
       type:Number,
       default:0
    },
    numOfVariant:{
       type:Number,
       default:0
    },
    variantType:[
         {
            option:{
                type:String,
                required:[true,"Option name is required"],
                trim:true
            },

            optionValue:[
                {
                    value:{
                        type:String,
                        required:[true,"Option  value is required"],
                        trim:true
                    }
                }
            ]

         }
    ],
    variantOptionValues:[
        {
            value:{
            type:String,
            required:true
        }
        }
    ],
    
    status:{
       type:String,
       required:true,
       default:"Draft"
    },
    
    variant:[
        {
            variantOptions:[
                {
                    option:{
                        type:String,
                        required:[true,"Option name is required"],
                        trim:true
                     },
                    value:{
                        type:String,
                        required:[true,"Option  value is required"],
                        trim:true
                     },
                }
            ],
            
            price:{
                type:Number,
                required:[true,"Please Enter Product Price"],
                maxLength:[8,"Price cannot exceed 8 character"]
            },
            camparePrice:{
               type:Number,
               default:0,
               maxLength:[8,"Price cannot exceed 8 character"]
           },
           costPerItem:{
                type:Number,
                required:[true,"Please Enter compared Price"],
                maxLength:[8,"Price cannot exceed 8 character"]
           },
           profit:{
                type:Number,
                required:[true,"Please Enter Product profit"],
                maxLength:[8,"Price cannot exceed 8 character"]
           },
           margin:{
                type:Number,
                required:[true,"Please Enter Product margin"],
                maxLength:[8,"Price cannot exceed 8 character"]
           },
           weight:{
                type:Number,
                default:0
            },
            stock:{
                type:Number,
                required:[true,"Please Enter Product Stock"],
                maxLength:[4,"Stock not exceed 10000"],
                default:1
          },
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
    }
})

module.exports = mongoose.model("Newproduct",newProductSchema)