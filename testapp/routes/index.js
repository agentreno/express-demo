var express = require('express');
var router = express.Router();

// Router-level middleware
// There's usually only a single middleware function so calling next() is
// unnecessary but comment it out here to see that it would prevent the next
// middleware for this route getting called
router.get('/', function(req, res, next) {

  // Below render call would end the response, both render() and send() may not
  // be called multiple times.
  //res.render('index', { title: 'Express' });

  // write() on the other hand may be called as many times as you like and
  // sends the data to the client immediately i.e. a 'streaming' response
  console.log('First router sub-stack middleware called');
  res.write('some data\n');
  next();
}, function(req, res, next) {
  console.log('Second router sub-stack middleware called');
  res.write('some extra data\n');

  // end() is necessary here, since write() calls didn't finish the response
  // try commenting it out to see the response hang
  res.end();
});

module.exports = router;
