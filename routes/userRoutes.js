const express = require('express');
const router = express.Router();
const User =require('../models/User')


router.post('/register', async (req, res) => {
  try {

   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
