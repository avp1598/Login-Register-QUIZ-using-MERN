var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());

//The below get and delete requests on / endpoint is used only for debugging purposes
/*
router.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/', function(req, res, next) {
  User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete('/',cors.corsWithOptions,(req, res, next) => {
  User.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});
*/

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.mail) user.mail = req.body.mail;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});
/*
function fu(data){
  console.log("username="+data.user.username);
}
*/

router.route('/:userId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser,(req,res,next) => {
    User.find({"username":req.params.userId})
    .then((user) => {
        if(req.params.userId!==req.user.username){
          err = new Error("Not authorized to view other profile");
          err.status = 404;
          return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = router;