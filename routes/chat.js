var express = require('express');
var router = express.Router();
let library = require("../public/javascripts/library");
/* GET home page. */

router.get(`/`, function (req, res, next) {
  res.render('index.html');
});

router.get('/editfoto', function (req, res, next) {
  req.sqlcomponents.editfoto(req.query.imgurl, req.session.user_id, res);
});

router.get('/addfriends', function (req, res, next) {
  req.sqlcomponents.AddFriends(parseInt(req.session.user_id), parseInt(req.query.friendsid), res);
});
router.get(`/commit.html`, function (req, res, next) {
  res.render("commit.html");
});
module.exports = router;
