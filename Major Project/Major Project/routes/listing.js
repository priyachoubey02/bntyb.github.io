const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const listingController = require("../controllers/listings.js");




router.route("/")
// INDEX ROUTE
.get(wrapAsync (listingController.index))
// CREATE ROUTE
.post(isLoggedIn, upload.single("listings[image]"), validateListing, wrapAsync (listingController.createRoute));

// RENDER CREATE ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
// SHOW ROUTE
.get(wrapAsync (listingController.showRoute))
// EDIT ROUTE
.put(isLoggedIn, isOwner, upload.single("listings[image]"), validateListing, wrapAsync (listingController.edit))
// DELETE ROUTE
.delete(isLoggedIn, isOwner, wrapAsync (listingController.deleteRoute));

// RENDER EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.renderEditForm));
  
module.exports = router;