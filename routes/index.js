const express = require('express');
const router = express.Router();
const { controller }  = require('./../controllers/index');
const path = require('path');


router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/html') });
});

//The body isn't sent anymore because the payload is simply not sent, number is sent trough parameters
router.get('/api/conversion/:data', controller);

module.exports = router;