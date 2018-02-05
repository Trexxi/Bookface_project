var express = require('express');
var router = express.Router();
var moment = require('moment');
var Card = require('../models/card');
/* GET users listing. */
router.get('/', function(req, res, next) {
    Card.findAllCards(req, res);
});

router.post('/newCard', function(req, res, next) {
    var cardData = req.body;
    console.log(req.body);
    var newCard = new Card(cardData);
    Card.createNewCard(newCard);
    res.send('s1ck');
    res.end();
});

router.post('/deleteCard', function(req, res, next) {
    Card.deletePost('5a7852f5c1b23b3d4440c9f0');
});

module.exports = router;