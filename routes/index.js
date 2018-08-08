const express = require('express');
const router = express.Router();
const config = require('../package.json');

/* GET home page. */
router.get('/version', function(req, res, next) {
  res.json({
    version: config.version,
  });
});

module.exports = router;
