var mongoose = require('mongoose')
require('mongoose-moment')(mongoose);
var moment = require('moment');

// User Schema
var CardSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: 'Date'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    }
});

var Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.createNewCard = function(newCard, res) {

    console.log(newCard);

    if(typeof newCard.message !== "undefined" && newCard.message !== ""&& typeof newCard.message !== "undefined") {
        newCard.save();
        res.status(200).json({
            message: 'Card was created',
            card:newCard
        });
    } else {
        res.status(406).json({
            message: 'Card has to have a message included'
        });
    }
};

module.exports.findAllCards =  function(req, res) {
    Card.find({},function(err, cards){
        var cardMap = {};

        cards.forEach(function(card){
            if(req.user._id.toString() === card.user.toString()) {
                console.log('am inside :)))))');
                cardMap[card._id] = card;
            }
        });

        console.log(cardMap);
        res.send(cardMap);
    });
};

module.exports.deletePost = function(id, callback) {
    var query = {_id: id.toString()};
    Card.findOneAndRemove(query, function(err){console.log(err)});
};

module.exports.updateCard = function(id,message,date) {
    var query = {_id: id.toString()};
    console.log(message,date);
    Card.findOneAndUpdate(query, {message:message, date:date}, {}, function(err) {
        console.log("ERRRR",err);
    });
};