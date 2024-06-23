const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// SIGN UP ROUTE
router.get("/signup",  userController.renderSignUp);
router.post("/signup", wrapAsync(userController.Signup));

// SIGN IN ROUTE
router.get("/login", userController.renderLogin);
router.post("/login", savedRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.Login );

// LOGOUT ROUTE
router.get("/logout", userController.Logout );

module.exports = router;