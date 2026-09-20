const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");

const listingsController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get( wrapAsync (listingsController.index)) //index route
.post(isLoggedIn, 
    validateListing, 
    upload.single('listing[image]'),
    wrapAsync(listingsController.createListing)
); //create route


//New Route
router.get("/new" ,
    isLoggedIn, 
    listingsController.renderNewForm
);

router.route("/:id")
.get(wrapAsync (listingsController.showListing)) //show route
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingsController.updateListing)
)   //update route
.delete(isLoggedIn,
    isOwner,
     wrapAsync (listingsController.destroyListing)
    ); //delete route

//edit route
router.get("/:id/edit" ,isLoggedIn,isOwner, wrapAsync(listingsController.editListing));

module.exports = router;