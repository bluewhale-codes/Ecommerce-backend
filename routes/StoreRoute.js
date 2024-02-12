const express = require("express");
const { body, validationResult } = require('express-validator');
const {getStoreInfo,addCompony,dashBoardInfo} = require("../controller/StoreDetailController");
const {isAuthenticatedUser,authorizeRoles,createAuthentication} = require("../middleware/auth")
const validation = [
    body('name').isLength({ min: 4 }).withMessage('must be at least 5 chars long'),
    body('owner').isLength({ max: 3 }).withMessage('must be at least 3 chars long'),
    body('companyAddress.phoneNo').isNumeric().isLength({min:10,max:10}).withMessage('Phone no. must be of 10 digits'),
    
]
const router = express.Router();

router.route("/copany/details").get(isAuthenticatedUser,authorizeRoles('admin'),getStoreInfo)
router.route("/dashboard/info").get(isAuthenticatedUser,authorizeRoles('admin'),dashBoardInfo)
router.route("/add/companyDetail/").post(validation,isAuthenticatedUser,authorizeRoles('admin'),createAuthentication,addCompony)
module.exports = router;