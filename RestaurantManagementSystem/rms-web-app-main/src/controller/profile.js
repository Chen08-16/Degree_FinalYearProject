const express = require('express');
const User = require('../models/User'); // Adjust path to the schema
const router = express.Router();


//fetch user
router.post('/user/getProfile/:id',async(req,res)=>{
    try{
        const userId = req.params.id
        const {username,phone,email,dob} = req.body
        console.log("Uid: ",userId)
        const q = await User.findOne({uid:userId})
        if(q) return res.status(200).json({message:"user exist",user:q})

        const createdUser = await User.create({
            uid:userId,
            username: username || " ",
            phone:phone || "",
            email:email ||"",
            dob:dob|| new Date()
        })  
        return res.status(200).json({message:"user created",user:createdUser})

    }catch(error){
        console.log("Failed to fetch user", error.message)
    }
})

router.put('/user', async (req, res) => {
  try {
    const { uid, username, dob, email, phone } = req.body;
    // Validate required fields
    if (!uid) {
      return res.status(400).json({ error: 'User ID (uid) is required.' });
    }

    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { uid }, // Match the user by UID
      { username, dob, email, phone }, // Update these fields
      { new: true, runValidators: true } // Return the updated document and validate
    );

    // If user not found
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Send the updated user as the response
    res.status(200).json({
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});


// Update user profile
router.put('/users/:email', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update user profile
router.put('/update-profile', async (req, res) => {
  const { uid, userName:username, dateOfBirth:dob, phone,email } = req.body;

  if (!uid || !username || !dateOfBirth || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {

    const user = await User.find({uid,email})
    if (!user) {
      // return res.status(404).json({ error: 'User not found' });
      await Account.create({ uid, username: userName, dob, email , phone })
    }
    const updatedUser = await User.findOneAndUpdate(
      { uid, email },
      { username, dob: new Date(dateOfBirth), phone },
      { new: true } // Return the updated document
    );


    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
