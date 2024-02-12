const Invoice = require("../models/InvoiceModel")
const Order = require("../models/orderModel")
const CompanyInfo = require("../models/companyInfoModel")
const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


exports.createInvoice = catchAsyncErrors(async(req,res,next)=>{

      req.body.user = req.user.id
      const order = await Order.findById(req.body.order);
      const invoice = await Invoice.create(req.body)
      if(order && order.invoiceStatus!==true){
        order.invoiceStatus=true;
        await order.save({validateBeforeSave:false})
      }else{
        return next(new ErrorHander("Invoice For this order already exists",404))
      }
      
      res.status(201).json({
          success:true,
          message:"Invoice created",
          invoice
      })
  })

exports.getInvoice = catchAsyncErrors(async(req,res,next)=>{

   const invoice = await Invoice.findOne({order:req.params.id})
        res.status(201).json({
          success:true,
          invoice
    })

})
exports.allInvoice = catchAsyncErrors(async(req,res,next)=>{

   const invoice = await Invoice.find();
        res.status(201).json({
          success:true,
          invoice
    })

})
