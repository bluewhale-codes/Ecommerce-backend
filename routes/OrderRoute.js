const express = require("express");
const {createInvoice,getInvoice,allInvoice,addCompony} = require("../controller/InvoiceController")
const { createOrder, GetSingleOrder, myOrders, getAllOrders,userOrders,getDashboardOrders, updateOrders, DeleteOrder } = require("../controller/ordersController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,createOrder);
router.route("/invoice/create/").post(isAuthenticatedUser,createInvoice);
router.route("/invoice/:id").get(getInvoice);
router.route("/all/invoice").get(allInvoice);
router.route("/single/order/:id").get(isAuthenticatedUser,GetSingleOrder);
router.route("/user/order/:id").get(isAuthenticatedUser,authorizeRoles('admin'),userOrders);
router.route("/order/me").get(isAuthenticatedUser,myOrders);
router.route("/admin/orders/").get(isAuthenticatedUser,authorizeRoles('admin'),getAllOrders);
router.route("/admin/orders/today/").get(isAuthenticatedUser,authorizeRoles('admin'),getDashboardOrders);
router.route("/admin/update/order/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateOrders)
router.route("/order/delete/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),DeleteOrder)
router.route("/order/delete/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),DeleteOrder)
module.exports = router;