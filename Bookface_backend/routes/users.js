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

router.post('/newCard', function(req, res, next) {
    var cardData = req.body;
    console.log(req.body);
    var newCard = new Card(cardData);
    Card.createNewCard(newCard);
    res.send('s1ck');
    res.end();
});

module.exports = router;