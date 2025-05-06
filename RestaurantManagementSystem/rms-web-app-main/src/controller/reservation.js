const express = require('express');
const Reservation = require('../models/Reservation'); // Adjust path to the schema
const router = express.Router();
router.get('/', async (req, res) => {
    const { date } = req.query;
    
    try {
      const reservations = await Reservation.find({ date });
      res.json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch reservations." });
    }
  });

// Endpoint to fetch reservations for a specific user
router.get('/user-reservations', async (req, res) => {
    const { userId } = req.query;  // Get userId from query parameters
   console.log(userId)
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
  
    try {
      // Find all reservations for the user
      const reservations = await Reservation.find({ uid: userId });
  
      if (!reservations) {
        return res.status(404).json({ message: "No reservations found for this user." });
      }
  
      res.status(200).json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching reservations." });
    }
});

// Endpoint to create a reservation
router.post('/', async (req, res) => {
    const { date, time, amPm, numberOfPeople, userId:uid, customerName, customerContact,tableNumber } = req.body;
  
    try {
      // Check if the table is already booked for the same date and time
      const existingReservation = await Reservation.findOne({ 
        date, 
        time, 
        amPm, 
        tableNumber 
      });
  
      if (existingReservation) {
        return res.status(400).json({ message: "The table is already booked for this time." });
      }
  
        // Create a new reservation
        const newReservation = new Reservation({
            date,
            time,
            amPm,
            numberOfPeople,
            uid,
            customerName,
            customerContact,
            tableNumber
        });
        await newReservation.save();
  
        res.status(201).json({ message: "Reservation successfully created!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the reservation." });
    }
  });


// Endpoint to cancel a reservation by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        // Find the reservation by ID and ensure it belongs to the user
        const reservation = await Reservation.findOne({ _id: id, uid: userId });
    
        if (!reservation) {
          return res.status(404).json({ message: "Reservation not found or you do not have permission to cancel this reservation." });
        }
    
        // Delete the reservation
        await reservation.deleteOne();
    
        res.status(200).json({ message: "Reservation successfully canceled!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while canceling the reservation." });
      }
  });

  module.exports = router;