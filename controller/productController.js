const Product = require("../models/ProductModel")
const Order = require('../models/orderModel')
const newProduct = require("../models/NewProductModel")
const ProductDiscount = require("../models/ProductdiscountModel")
const shippingINFO = require("../models/shippingInfoMode");
const Coupons = require('../models/CouponsModel');
const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');


// create Products
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
     let images = []
     
     if(typeof req.body.images === "string"){
       images.push(req.body.images);
     }else{
         images = req.body.images
     }
    
     
     const imagesLink = [];
     for (let i = 0; i < images.length; i++) {
         const result =  await cloudinary.v2.uploader.upload(images[i],{
             folder:"products"
         })

         imagesLink.push({
             public_Id:result.public_id,
             url:result.secure_url
         }) 
     }
     console.log(imagesLink)
     
    req.body.images = imagesLink;
    req.body.user = req.user.id

    
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product,
        
    })
});

exports.createNewProduct = catchAsyncErrors(async(req,res,next)=>{

    req.body.user = req.user.id
    const user = req.user.id
    const title = req.body.title
    const description = req.body.description
    const catagory = req.body.catagory
    const productType = req.body.productType
    const status = req.body.status
    const productTag = JSON.parse(req.body.productTag)
    const variantType = JSON.parse(req.body.variantType)
    const variant = JSON.parse(req.body.variant)
    const variantOptionValues = []
    variantType.map((o)=>{
        o.optionValue.map((v)=>variantOptionValues.push({value:v.value}))
    })
    const newproduct = await newProduct.create({
        title,
        description,
        catagory,
        productType,
        status,
        productTag,
        variantType,
        variant,
        variantOptionValues,
        user
    })
    res.status(201).json({
        success:true,
        newproduct,
        
    })
});


// Get All products
exports.getAllProjects = catchAsyncErrors(async (req,res,next)=>{

   
    const resultPerPage =12;
    const apiFeature = new  ApiFeatures(Product.find(),req.query).search().catagorySearch().pagination(resultPerPage);
    const productCount = await Product.countDocuments();
    const products = await apiFeature.query;
    res.status(201).json({
        success:true,
        products,
        productCount,
        resultPerPage
    })

});

// Get All products --- Admin
exports.getAdminProjects = catchAsyncErrors( async (req,res,next)=>{
   
    const productCount = await Product.countDocuments();
    const products = await Product.find();
    res.status(201).json({
        success:true,
        productCount,
        products
    })

});

// Get Product Details
exports.getProdectDetails = catchAsyncErrors( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product Not found",404))
    }
    

    res.status(200).json({
        success:true,
        product
    })
});

// Update All Products --Admin
exports.updateProduct = catchAsyncErrors( async (req,res,next)=>{
   

    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product Not found",500))
    }
    //Images start here//
    let images = [];

    if(typeof req.body.images === "string"){
        images.push(req.body.images);
      }else{
          images = req.body.images
      }

    if(images !== undefined){
    // Deleting images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            result = await cloudinary.v2.uploader.destroy(product.images[i].public_Id)   
        }
    }

    let imagesLink = [];
     for (let i = 0; i < images.length; i++) {
         const result =  await cloudinary.v2.uploader.upload(images[i],{
             folder:"products"
         })

         imagesLink.push({
             public_Id:result.public_id,
             url:result.secure_url
         }) 
     }

    req.body.images = imagesLink;

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
});



// Delete a Product-- Admin

exports.deleteProduct = catchAsyncErrors( async (req,res) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("Product Not found",500))
    }
    
    // Deleting images from cloudinary

    for (let i = 0; i < product.images.length; i++) {
        
        result = await cloudinary.v2.uploader.destroy(product.images[i].public_Id) 
        
    }

    product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:"Product Remove successfully"
    })
});

// Create New Review or update Review
exports.createProductReview = catchAsyncErrors( async (req,res,next) =>{
   
    const {rating,comment,productId} = req.body  
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    };

    const product = await Product.findById(productId);
   
    const isReviewed = product.review.find(rev=> rev.user.toString()===req.user._id.toString());
    if(isReviewed){
       product.review.forEach((rev) => {
        if(rev.user.toString()===req.user._id.toString()){
            rev.rating = rating,
            rev.comment = comment
        }
       });
    }else{
        product.review.push(review);
        product.numOfReviews = product.review.length
    }
 
    let avg = 0;
    product.review.forEach(rev=>{
        avg+=rev.rating
    })

    product.rating = avg/product.review.length;

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
    })
})

// Get ALl product Reviews
exports.getProductReview = catchAsyncErrors( async (req,res,next) =>{

  const product = await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHander("Product not found",404));
  }
  res.status(200).json({
    success:true,
    reviews:product.review
  });

});

// Delete Review
exports.deleteProductReview = catchAsyncErrors( async (req,res,next) =>{

    const product = await Product.findById(req.query.productId);
    console.log(product);
    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    console.log(req.query.productId + 'This is Product ID')
    console.log(req.query.id + 'This is review ID')
    
    const review = product.review.filter((rev)=> rev._id.toString() !== req.query.id.toString());
    console.log(review + "This is review")
    let avg = 0;
    review.forEach((rev)=>{
        avg+=rev.rating
    })

    let rating = 0;
    if(review.length===0){
        rating = 0
    }else{
        rating = avg/review.length;
    }

    const numOfReviews = review.length

    await Product.findByIdAndUpdate(req.query.productId,{
        review,
        rating,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
    success:true,
    message:'Review delete successfully'
    });
  })






// get shipping Info
exports.getShippingInfo = catchAsyncErrors(async(req,res,next)=>{

    const shippInfo = await shippingINFO.findOne({user:req.user._id})
    

    res.status(201).json({
        success:true,
        shippInfo
    })
   
});

// get shipping Info --ADMIN
exports.getShippingDetailAdmin = catchAsyncErrors(async(req,res,next)=>{

    const shippInfo = await shippingINFO.findOne({user:req.params.id})
    res.status(201).json({
        success:true,
        shippInfo
    })
   
});


// create shipping Info
exports.addShippingInfo = catchAsyncErrors(async(req,res,next)=>{

    const {shippAddressInfo} = req.body;

    const shippInfo = await shippingINFO.create({
        shippingInfo:shippAddressInfo,
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        message:"Shipping address added successfuly",
        shippInfo
    })
   
});
// Update shipping Info
exports.UpdateShippingInfo = catchAsyncErrors(async(req,res,next)=>{

    let shippInfo = await shippingINFO.findById(req.params.id);

    if(!shippInfo){
        return next(new ErrorHander("shipping info not found with this user",404))
    }

    
    const {shippAddressInfo} = req.body;
    


    shippInfo = await shippingINFO.findByIdAndUpdate(req.params.id,{
        shippingInfo:shippAddressInfo,
        user:req.user._id
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(201).json({
        success:true,
        message:"Shipping address Update successfuly",
        shippInfo
    })
   
});


// delete shipping Info 
exports.deleteShippingAddress = catchAsyncErrors(async(req,res,next)=>{

    let shippInfo = await shippingINFO.findById(req.params.id);

    if(!shippInfo){
        return next(new ErrorHander("shipping info not found with this user",404))
    }


    shippInfo = await shippingINFO.findByIdAndDelete(req.params.id)

    res.status(201).json({
        success:true,
        message:"Address remove successfully"
    })
   
});


// crate coupon --Admin

exports.createCoupon = catchAsyncErrors(async(req,res,next)=>{
  
  const {name,couponDescription,couponValue,couponExpireDate} = req.body
 
   const coupon = await Coupons.create({
            name,
            couponDescription,
            couponValue,
            couponExpireDate,
            user:req.user._id
   })
   res.status(201).json({
       success:true,
       coupon
   })
});
// Get all Coupons --Admin

exports.getAllCoupon = catchAsyncErrors(async(req,res,next)=>{
  
  
   const coupons = await Coupons.find()
   res.status(201).json({
       success:true,
       coupons
   })
});

// create Discount product
exports.createDiscountProduct = catchAsyncErrors(async(req,res,next)=>{

    const {sdPrice,product} = req.body
    const pro = await Product.findById(product);
    if(!pro.isDiscount){
        pro.isDiscount = true
        pro.dpercentage = sdPrice
        pro.save({validateBeforeSave:false})
    }else{
        return next(new ErrorHander("This product already have discount",404))
    }
    const discontproduct = await ProductDiscount.create({
        sdPrice,
        product,
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        discontproduct
    })
});

exports.getDiscountProduct = catchAsyncErrors(async(req,res,next)=>{

    const dproducts = await Product.find({isDiscount:true});
    if(!dproducts){
        return next(new ErrorHander("No product to display",404))
    }
    res.status(201).json({
        success:true,
        dproducts
    })
});
exports.getDiscountPrice = catchAsyncErrors(async(req,res,next)=>{

    const dPrice = await ProductDiscount.findOne({product:req.body.product});
    res.status(201).json({
        success:true,
        dPrice
    })
});

exports.deleteDiscountProduct = catchAsyncErrors(async(req,res,next)=>{

    let dproduct = await ProductDiscount.findById(req.params.id);
    
    if(!dproduct){
        return next(new ErrorHander("No Product discount found with this Id",404))
    }
    const pro_id =  dproduct.product;
    
    let pro = await Product.findById(pro_id);

    if(pro.isDiscount === true && dpercentage!==null){
        pro.isDiscount = false;
        pro.dpercentage = null;
        pro.save({validateBeforeSave:false})
    }

    dproduct = await ProductDiscount.findByIdAndDelete(req.params.id)

    res.status(201).json({
        success:true,
        message:"discount removed"
    })
   
});





