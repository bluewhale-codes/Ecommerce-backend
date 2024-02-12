const express = require("express");
const { getAllProjects,createProduct,getme, createDiscountProduct,getDiscountProduct,getDiscountPrice,deleteDiscountProduct ,updateProduct, deleteProduct, getProdectDetails, createProductReview, getProductReview, deleteProductReview, getAdminProjects, addShippingInfo, getShippingInfo, UpdateShippingInfo, deleteShippingAddress,createCoupon, getAllCoupon, createNewProduct, getShippingDetailAdmin } = require("../controller/productController")
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")


const router = express.Router()
router.route("/products").get(getAllProjects)
router.route("/products/admin").get(isAuthenticatedUser, authorizeRoles('admin') ,getAdminProjects)
router.route("/products/new").post( isAuthenticatedUser, authorizeRoles('admin'),createNewProduct)
router.route("/products/:id").put( isAuthenticatedUser, authorizeRoles('admin'),updateProduct)
router.route("/shippingInfo/detail/:id").get(isAuthenticatedUser, authorizeRoles('admin'),getShippingDetailAdmin)
router.route("/products/delete/:id").delete( isAuthenticatedUser, authorizeRoles('admin'),deleteProduct)
router.route("/products/details/:id").get(getProdectDetails)
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/review").get(getProductReview).delete(isAuthenticatedUser,deleteProductReview)

router.route("/shippingInfo/update/:id").put(isAuthenticatedUser,UpdateShippingInfo).delete(isAuthenticatedUser,deleteShippingAddress)
router.route("/shippingInfo/delete/:id").delete(isAuthenticatedUser,deleteShippingAddress)
router.route("/shippingInfo").post(isAuthenticatedUser,addShippingInfo).get(isAuthenticatedUser ,getShippingInfo);
router.route("/create/coupon").post(isAuthenticatedUser,createCoupon);
router.route("/all/coupon").get(isAuthenticatedUser,getAllCoupon);
router.route("/add/discountProduct").post(isAuthenticatedUser,createDiscountProduct);
router.route("/discountproduct").get(isAuthenticatedUser,authorizeRoles('admin'),getDiscountProduct);
router.route("/discoutPrice").get(isAuthenticatedUser,authorizeRoles('admin'),getDiscountPrice);
router.route("/discount/delete/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteDiscountProduct);
module.exports = router