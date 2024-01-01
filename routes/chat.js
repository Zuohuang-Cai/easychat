var express = require('express');
var router = express.Router();
let library = require("../public/javascripts/library");
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index.html');
});

module.exports = router;
