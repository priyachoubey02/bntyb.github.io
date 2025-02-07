const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Login First");
        return res.redirect("/login");
      }
      next();
}

module.exports.savedRedirectUrl = (req, res, next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
 }
 next();
};

module.exports.isOwner = async (req, res, next) =>{
  let{id} = req.params;
  console.log(req.body.listings);
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
   return res.redirect(`${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) =>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  else{
    next();
  }
};

module.exports.validateReview = (req, res, next) =>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  else{
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) =>{
  let{id, reviewId} = req.params;
  console.log(req.body.listings);
  let listing = await Review.findById(ReviewId);
  if(!reviewId.author.equals(res.locals.currUser._id)){
    req.flash("error", "This is not your review");
   return res.redirect(`${id}`);
  }
  next();
};