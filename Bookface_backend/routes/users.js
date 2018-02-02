var express = require('express');
var router = express.Router();
var moment = require('moment');
var Card = require('../models/card');
/* GET users listing. */
router.get('/', function(req, res, next) {
    Card.hehe("HEHE");
    var users = [
        {
            firstName:'beck',
            lastName: 'linusman',
            date:moment(),
            isTired: true

        },
        {
            firstName: 'trexxytrice',
            lastName: 'teddysson',
            date:moment(),
            isTired: true

        }
    ];
    res.json(users);
});

router.post('/mj', function(req, res, next) {
    console.log(req.body, "FEIJOFQEWJOIFQEJOIFQEOIFJQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEQEJ");
    req.body.date = new moment();
    console.log(req.body.date);
    Card.createNewCard(req.body);
    res.send("good job br");
    res.end();
});

module.exports = router;