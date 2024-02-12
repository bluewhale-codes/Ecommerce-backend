const express = require("express");
const {isAuthenticatedUser,authorizeRoles,isPassword} = require("../middleware/auth")
const { registerUser,resiterUserTest, loginUser, logout, forgotPassword, resetPassword, getUserDetails, UpdatePassword, UpdateProfile, getSingleuser, getAllusers, UpdateUserRole, deleteUser } = require("../controller/userController");
const router = express.Router();

router.route("/resiter/test").post(isPassword,resiterUserTest)
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,UpdatePassword);
router.route("/me/update").put(isAuthenticatedUser,UpdateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles('admin'),getAllusers);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles('admin'),getSingleuser).put(isAuthenticatedUser,authorizeRoles('admin'),UpdateUserRole).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);
module.exports = router;