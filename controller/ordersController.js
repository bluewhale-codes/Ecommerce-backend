const Order = require("../models/orderModel")
const Product = require("../models/ProductModel")
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHander = require("../utils/errorhander")
    const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.createOrder = catchAsyncErrors(async(req,res,next)=>{
  const{shippingInfo,
    orderItems,
    paymentInfo,
    totalMRP,
    shippingPrice,
    couponDiscount,
    deliveredAt,
    subTotal} = req.body

    const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    totalMRP,
    shippingPrice,
    couponDiscount,
    subTotal,
    deliveredAt,
    paidAt:Date.now(),
    user:req.user._id
    })
    
    res.status(201).json({
        success:true,
        message:"Order placed successfuly",
        order
    })
})

// get single order -- Admin
exports.GetSingleOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHander("order not found with this ID",404))
    }

    res.status(200).json({
       success:true,
       order
    })

})

// get logged in user order
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{

    const umer = req.user
    const apiFeature = new  ApiFeatures(Order.find(),req.query).orderStatus(umer);
    const orders = await apiFeature.query;
    // const orders = await Order.find({user:req.user._id});
    res.status(200).json({
       success:true,
       orders
    })

});


// get all orders --Admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();
    const ordersCount = await Order.countDocuments()
    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success:true,
        totalAmount,
        ordersCount,
        orders
    })
})
// get  user orders --Admin
exports.userOrders = catchAsyncErrors(async(req,res,next)=>{

    
    const orders = await Order.find({user:req.params.id})
    const orderCount = orders.length
    // const orders = await Order.find({user:req.user._id});
    res.status(200).json({
       success:true,
       orderCount,
       orders
    })

});

exports.getDashboardOrders= catchAsyncErrors( async (req,res,next)=>{
    const start = new Date().toDateString();
    
    const orders = await Order.find({createdAt:{ $gte:start}})
    res.status(201).json({
        success:true,
        orders
    })

});

// update orders status --Admin
exports.updateOrders = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    
    if(!order){
        return next(new ErrorHander("Order not found with this ID",404))
    }
    
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHander("Your have already delivered this order",400))
    }

    if(req.body.status==='Shipped'){
        order.orderItems.forEach(async(order)=>{
            await updateStock(order.product,order.quantity);
        })
    }
    
    order.orderStatus = req.body.status;
    if(req.body.status==="Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,    
    })
})

async function updateStock(id,quantity){
 console.log("update Stock");
  const product = await Product.findById(id);
  product.Stock -= quantity;
  await product.save({validateBeforeSave:false});
}

// delete order --Admin
exports.DeleteOrder = catchAsyncErrors(async(req,res,next)=>{
    let order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander("Order not found with this ID",404))
    }

    
    order = await Order.findByIdAndDelete(req.params.id)
    
   
    res.status(200).json({
        success:true,
    })
})
