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


/*TODO:use delete*/
router.post('/deleteCard', function(req, res, next) {
    Card.deletePost(req.body._id);
    res.send('deleteddddd');
    res.end();
});

/*TODO:use put*/
router.post('/updateCard', function(req, res, next) {
    console.log(req.body,"req");
    Card.updateCard(req.body._id, req.body.message, req.body.date);
    res.send('updated');
    res.end();
});

module.exports = router;