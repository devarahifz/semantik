const express = require('express');
const developer = require('../models/developer');

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.query.search) {
    developer.getAll(req, res);
  } else {
    developer.search(req, res);
  }
});

module.exports = router;

