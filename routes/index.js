var express = require('express');
var router = express.Router();
let library = require("../public/javascripts/library");

router.get(['/LoginPage', '/'], function (req, res, next) {
  res.render('login.html');
});

router.post('/SIGN', function (req, res, next) {
  req.sqlcomponents.CreateNewAccound(req.body.Nickname.trim(), req.body.Username.trim(), req.body.Password.trim(), req, res)
});

router.post('/INLOG', function (req, res, next) {
  req.sqlcomponents.Loggin(req.body.Username.trim(), req.body.Password.trim(), req, res)
});

router.use((req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/LoginPage')
  }
  next();
})

module.exports = router;
