var express = require('express');
var router = express.Router();
let library = require("../public/javascripts/library");
/* GET home page. */

router.get('/getfriendslist', function (req, res, next) {
  req.sqlcomponents.Getfriendlist(req.session.user_id,res);
});
router.get('/addfriends/:secondid', function (req, res, next) {
  req.sqlcomponents.AddFriends(req.session.user_id,req.params.secondid,res);
});
module.exports = router;
