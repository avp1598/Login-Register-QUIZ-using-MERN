var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Tests = require('../models/test');

const testRouter = router;
testRouter.use(bodyParser.json());

testRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Tests.find({},{_id:0,description:1,number:1})
    .then((tests) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tests);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
    Tests.create(req.body)
    .then((test) =>{
        console.log('Test Created ', test);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(test);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Tests.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

testRouter.route('/:testId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Tests.find({"number":req.params.testId})
    .then((test) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(test);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,(req, res, next) => {
    Tests.remove({"number":req.params.testId})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = testRouter;

