const express = require('express');
const games = require('../models/games');

const router = express.Router();
router.get('/', (req, res) => {
  if (!req.query.search) {
    games.getHalf(req, res);
  } else {
    games.search(req, res);
  }
});

router.get('/games', (req, res) => {
  if (!req.query.search) {
    games.getAll(req, res);
  } else {
    games.search(req, res);
  }
});

module.exports = router;