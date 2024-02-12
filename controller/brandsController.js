const Brands = require("../models/brandModel")
const Product = require("../models/ProductModel")

const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require('cloudinary')

exports.createBrand = catchAsyncErrors(async(req,res,next)=>{
  
    let images = []
    let logo;
    
     
     if(typeof req.body.images === "string"){
       images.push(req.body.images);
     }else{
         images = req.body.images
     }
     if(typeof req.body.logo === "string"){
        logo = req.body.logo
     }
    
    let logoLink;
    const logoresult = await cloudinary.v2.uploader.upload(logo,{
        folder:"Brand"
    })

    logoLink={
           public_Id:logoresult.public_id,
            url:logoresult.secure_url
    }


    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result =  await cloudinary.v2.uploader.upload(images[i],{
            folder:"Brand"
        })

        imagesLink.push({
            public_Id:result.public_id,
            url:result.secure_url
        }) 
    }
    

    req.body.images = imagesLink;
    req.body.logo = logoLink;
    req.body.user = req.user._id


   


   
   const brand = await Brands.create(req.body)
   res.status(201).json({
       success:true,
       brand,
       
   })
   
});

exports.getAllBrands = catchAsyncErrors(async(req,res,next)=>{
    const brands = await Brands.find()
    const brandsCount = await Brands.countDocuments();
   res.status(201).json({
       success:true,
       brandsCount,
       brands,      
   })
   
});


exports.getOneBrand = catchAsyncErrors(async(req,res,next)=>{
  


   const brand = await Brands.findById(req.params.id)
   res.status(201).json({
       success:true,
       brand,
       
   })
   
});



exports.getBrandProducts = catchAsyncErrors(async(req,res,next)=>{
  

    const product = await Product.find({Brand:req.params.id})
    if(!product){
        return next(new ErrorHander("Product Not found",404))
    }
    

    res.status(200).json({
        success:true,
        product
    })


});



