const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();
const multer = require('multer');

// Configure multer storage
// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  const upload = multer({ storage });


// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        return res.json(menuItems);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// // Add a menu item
// router.post('/', async (req, res) => {
//   const { menuid, foodname, image, foodstatus, price } = req.body;
//   const newMenu = new Menu({ menuid, foodname, image, foodstatus, price });

//   try {
//     await newMenu.save();
//     res.status(201).json(newMenu);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


// Add a menu item
router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log incoming data
        const { foodname, foodstatus, price, image } = req.body;

        const createdMenu = await Menu.create({ foodname, image, foodstatus, price });
        console.log('Created Menu:', createdMenu);

        res.status(201).json({ createdMenu });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});
// // Update a menu item
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { foodname, image, foodstatus, price } = req.body;

//   try {
//      // Prepare fields for update
//       const updateFields = { foodname, foodstatus, price };

//       // If an image is uploaded, include it in the update
//       if (req.file) {
//           updateFields.image = `/images/${req.file.filename}`;
//       }
//       // Update the menu item
//       const updatedMenu = await Menu.findByIdAndUpdate(id, updateFields, {
//           new: true, // Return the updated document
//       });

//       if (!updatedMenu) {
//           return res.status(404).json({ error: 'Menu item not found' });
//       }

//       res.json(updatedMenu);
//   } catch (err) {
//       console.error('Error updating menu item:', err);
//       res.status(400).json({ error: err.message });
//   }
// });

// Update a menu item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { foodname, image, foodstatus, price } = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { foodname, image, foodstatus, price },
      { new: true }
    );
    res.json(updatedMenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Menu.findByIdAndDelete(id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
