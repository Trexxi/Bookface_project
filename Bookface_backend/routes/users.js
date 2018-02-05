var express = require('express');
var router = express.Router();
var moment = require('moment');
var Card = require('../models/card');
/* GET users listing. */
router.get('/', function(req, res, next) {
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
    console.log(req.body);
    var newCard = new Card({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isTired: req.body.isTired
    });
    console.log(req.body);

    newCard.firstName = req.body.firstName;
    newCard.lastName = req.body.lastName;
    newCard.isTired = req.body.isTired;
    Card.createNewCard(newCard);
    res.end();
});

module.exports = router;