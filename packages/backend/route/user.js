const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  const { worldId, ethAddress, username } = req.body;

  res.status(201).json({ message: 'User registered successfully!' });
});

module.exports = router;
