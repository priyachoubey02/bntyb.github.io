const { response } = require("express");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});


// INDEX ROUTE
module.exports.index = async (req, res) =>{
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", {allListings});
};

// RENDER CREATE ROUTE  
module.exports.renderNewForm = (req, res) =>{
  console.log(req.user);
  res.render("./listings/new.ejs");
};
// CREATE ROUTE
module.exports.createRoute = async (req, res, next) =>{
 let response = await geocodingClient.forwardGeocode({
    query: req.body.listings.location,
    limit: 1,
  })
  .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listings);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing created");
  console.log("404");
  res.redirect("/listings");
  console.log(req.body);
};

// SHOW ROUTE
module.exports.showRoute = async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author",}}).populate("owner");
  if(!listing){
    req.flash("success", "Listing do not exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("./listings/show.ejs", {listing});
};

//RENDER EDIT ROUTE
module.exports.renderEditForm = async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("success", "Listing do not exist");
    res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload'w_250");
  res.render("./listings/edit.ejs", {listing, originalImage});
};

//EDIT ROUTE
module.exports.edit = async (req, res) =>{
  let{id} = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {...req.body.listings});
  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
  }
  res.redirect("/listings");
};

// DELETE ROUTE
module.exports.deleteRoute = async (req, res) =>{
  let {id} = req.params;
  let deletedListings = await Listing.findByIdAndDelete(id);
  console.log(deletedListings);
  req.flash("error", "Listing Deleted");
  res.redirect("/listings");
};