const Catagory = require("../models/catagoryHandlerModels/catagoryModel")
const CatagoryType = require("../models/catagoryHandlerModels/catagoryTypeModel")
const SubCatagoryType = require("../models/catagoryHandlerModels/subcatagoryTypeModel")
const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.createCatagory = catchAsyncErrors(async(req,res,next)=>{

    const{catagory,
        } = req.body
    
    const CataGory = await Catagory.create({
        catagory,
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        CataGory,
    })

});

exports.createCatagoryType = catchAsyncErrors(async(req,res,next)=>{

    const{catagorytypename,
        catagory,
        } = req.body
    
    const CatagoryT = await CatagoryType.create({
        catagorytypename,
        catagory,
    user:req.user._id
    })
    res.status(201).json({
        success:true,
        CatagoryT,
        
    })

});
exports.createsubCatagoryType = catchAsyncErrors(async(req,res,next)=>{

    const{subcatagorytypename,
        unitvalue,
        catagorytype,
        } = req.body
    
    const SubCatagory = await SubCatagoryType.create({
        subcatagorytypename,
        unitvalue,
        catagorytype,
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        SubCatagory,
        
    })

});

exports.getAllCatagory = catchAsyncErrors(async(req,res,next)=>{

    const allCatagory = await Catagory.find();
    res.status(201).json({
        success:true,
        allCatagory
    })

});

exports.getcatagoryType = catchAsyncErrors(async(req,res,next)=>{
    
    const allCatagory = await Catagory.find();
    res.status(201).json({
        success:true,
        allCatagory
    })

});

