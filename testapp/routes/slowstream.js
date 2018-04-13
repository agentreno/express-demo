var express = require('express');
var router = express.Router();

// Router-level middleware
router.get('/', function(req, res, next) {

  console.log('First slowstream router sub-stack middleware called');
  res.write('some data\n');
  next();
}, function(req, res, next) {
  console.log('Second slowstream router sub-stack middleware called');

  // Prove it's a streaming by writing the next part of the stream after a
  // delay, run `http --stream localhost:3000/slowstream` using httpie
  return new Promise(resolve => {
    setTimeout(() => resolve('some extra data'), 5000)
  }).then(data => {
    res.write(data);
    res.end();
  });

  // Also prove that it's dealing with other requests while waiting for the
  // Promise to resolve by running:
  // ab -k -c 20 -n 20 http://localhost:3000/slowstream
});

module.exports = router;
