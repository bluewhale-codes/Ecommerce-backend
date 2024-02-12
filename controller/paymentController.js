const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const STRIPE_SECRETE_KEY = "sk_test_51KpxHmSE5AcGCDP8puD9zajz7qKG4Df1CcqygY9MVTL3njU0V7EHG78bjAVTqZ4eg05U7V55XMw0pSFZ3k6sorKf00ygSlvCWf"
const stripe = require("stripe")(STRIPE_SECRETE_KEY);

exports.processPayment = catchAsyncErrors(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr"
    })

    res.status(200).json({success:true,client_secret:myPayment.client_secret});

})

exports.sendStripeApiKey = catchAsyncErrors(async(req,res,next)=>{

    res.status(200).json({stripeApiKey:"pk_test_51KpxHmSE5AcGCDP8AMJ9Q7peUUkVt2sYMpEt7sfSj9rrpVgyZjVm6G3GZKOotIarVb0f9aD4YqeuRfooYR7gyvjv00j6b2iQ7i"});

})

