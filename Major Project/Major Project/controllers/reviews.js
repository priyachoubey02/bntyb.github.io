const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// CREATE REVIEW ROUTE
module.exports.createReview = async(req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    await newReview.save();
    await listing.save();
    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`)
  };

  // DELETE REVIEW ROUTE
  module.exports.destroyReview = async (req, res) =>{
    let{id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    console.log("Review is Deleted Permanently");
    res.redirect(`/listings/${id}`);
  };