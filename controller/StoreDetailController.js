const CompanyInfo = require("../models/companyInfoModel")
const Product  = require("../models/ProductModel")
const Brands  = require("../models/brandModel")
const User  = require("../models/userModel")
const Order  = require("../models/orderModel")
const Invoice  = require("../models/InvoiceModel")
const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getStoreInfo = catchAsyncErrors(async(req,res,next)=>{

   const storeDetail = await CompanyInfo.findOne({owner:req.user.id})
        res.status(201).json({
          success:true,
          storeDetail
    })

})
exports.addCompony = catchAsyncErrors(async(req,res,next)=>{
   
  req.body.owner = req.user.id;
  const company = await CompanyInfo.create(req.body);
       res.status(201).json({
         success:true,
         company
   })
})

exports.dashBoardInfo = catchAsyncErrors(async(req,res,next)=>{
  
  const productCount = await Product.countDocuments();
  const brandsCount = await Brands.countDocuments();
  const customerCount = await User.countDocuments();
  const orders = await Order.countDocuments();
  const invoiceCount = await Invoice.countDocuments();

       res.status(201).json({
         success:true,
         productCount,
         brandsCount,
         customerCount,
         orders,
         invoiceCount
   })


})
