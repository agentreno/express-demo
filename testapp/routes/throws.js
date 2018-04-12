var express = require('express');
var router = express.Router();

// Router-level middleware
router.get('/', function(req, res, next) {
  // Prove that throwing a random error makes its way over to the error
  // handling middleware in app.js
  console.log('Hit throws route');
  throw new Error('raised in throws route');
});

module.exports = router;
