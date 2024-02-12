const express = require("express")
const {createBrand,getBrandProducts,getAllBrands, getOneBrand} = require("../controller/brandsController")
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")

const router = express.Router()

router.route("/Brand/create").post(isAuthenticatedUser, authorizeRoles('admin') ,createBrand)
router.route("/Brand/product/:id").get(getBrandProducts)
router.route("/Brand/all").get(getAllBrands)
router.route("/Brand/detail/:id").get(getOneBrand)
module.exports = router