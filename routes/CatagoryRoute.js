const express = require("express");
const { createCatagory , createCatagoryType ,createsubCatagoryType, getAllCatagory} = require("../controller/catagoryController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")
const router = express.Router();

router.route("/subcatagory/create").post(isAuthenticatedUser,createsubCatagoryType);
router.route("/catagoryType/create").post(isAuthenticatedUser,createCatagoryType);
router.route("/catagory/create").post(isAuthenticatedUser,createCatagory);
router.route("/catagory/get").get(getAllCatagory);
module.exports = router;