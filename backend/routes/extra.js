// const express = require("express");
// const router = express.Router();
// const Rider = require("../models/Biker"); // Assuming Biker.js contains the Rider model
// const { requireAuth } = require("../middleware/isLoggedIn");
// const multer = require("multer");
// const nodemailer = require("nodemailer");

// const dotenv = require("dotenv");
// dotenv.config();

// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_ID,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Uploads will be stored in the 'uploads/' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage: storage });

// // Create a 2dsphere index on the location field (geospatial index)
// Rider.collection.createIndex({ location: "2dsphere" }, function (err) {
//   if (err) {
//     console.error("Error creating geospatial index:", err);
//   } else {
//     console.log("Geospatial index created successfully.");
//   }
// });

// router.post(
//   "/riders",
//   upload.fields([{ name: "drivingPapers", maxCount: 1 }]),
//   // requireAuth,
//   async (req, res) => {
//     // Your route handler code
//   }
// );

// router.get("/nearest-riders", async (req, res) => {
//   // Your route handler code
// });

// module.exports = router;
