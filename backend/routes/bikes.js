const express = require("express");
const router = express.Router();
const Rider = require("../models/Biker"); // Assuming Biker.js contains the Rider model
const { requireAuth } = require("../middleware/isLoggedIn");
const multer = require("multer");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

router.post(
  "/riders",
  async (req, res) => {
    try {
      const {
        name,
        latitude,
        longitude,
        preOwned,
        address,
        email,
        drivingPapers,
        phoneNumber,
      } = req.body;
      console.log(drivingPapers, name)
      const newRider = new Rider({
        name,
        preOwned,
        address,
        email,
        phoneNumber,
        drivingPapers:drivingPapers.toString(),
        location: {
          type: "Point",
          coordinates: [44, 88],
        },
      });
      await newRider.save();

      // Send email
      const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: "Inspection Details from Two Wheeler Rental Platform",
        text: `Dear Customer,
        
        Thank you for using our Two Wheeler Rental Platform. We are in the process of inspecting the details you provided for your rental. Our team will be visiting your location to verify the information and inspect the vehicle.
        
        Please ensure that the following details are accurate:
        
        Name: ${name}
        Address: ${address}
        Latitude: ${latitude}
        Longitude: ${longitude}
        Pre-Owned: ${preOwned}
        Phone Number: ${phoneNumber} 
        Our team will take pictures of the bike/scooter during the inspection process for verification purposes.
        
        For any queries or concerns, please feel free to reach out to us.
        
        Regards,
        Two Wheeler Rental Platform Team`,
        html: `
        <h3>Dear Customer,</h3>
        
        <p>Thank you for using our <strong>Two Wheeler Rental Platform</strong>. We are in the process of inspecting the details you provided for your rental. Our team will be visiting your location to verify the information and inspect the vehicle.</p>
        
        <p>Please ensure that the following details are accurate:</p>
        
        <ul>
          <li><strong>Name :</strong> ${name}</li>
          <li><strong>Address :</strong> ${address}</li>
          <li><strong>Latitude :</strong> ${latitude}</li>
          <li><strong>Longitude :</strong> ${longitude}</li>
          <li><strong>Phone Number :</strong> ${phoneNumber}</li>
          <li><strong>Pre-Owned :</strong> ${preOwned}</li>
        
        </ul>
        
        <p>Our team will take pictures of the bike/scooter during the inspection process for verification purposes.</p>
        
        <p>For any queries or concerns, please feel free to reach out to us.</p>
        
        <p>Regards,<br>
        <strong>Two Wheeler Rental Platform Team</strong></p>`,
        
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(201).json(newRider);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/nearest-riders", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const riders = await Rider.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000, // Max distance in meters (adjust as needed)
        },
      },
    });
    res.json(riders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a 2dsphere index on the location field (geospatial index)
Rider.collection.createIndex({ location: "2dsphere" }, function (err) {
  if (err) {
    console.error("Error creating geospatial index:", err);
  } else {
    console.log("Geospatial index created successfully.");
  }
});

module.exports = router;
