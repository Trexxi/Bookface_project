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
        type: 'Moment',
        default: moment()
    }
});

var Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.createNewCard = function(newCard) {
    newCard.save();
};

module.exports.findAllCards =  function(req, res) {
    Card.find({},function(err, cards){
        var cardMap = {};

        cards.forEach(function(card){
            cardMap[card._id] = card;
        });

        res.send(cardMap);
    });
};

module.exports.deletePost = function(id, callback) {
  Card.remove({_id: id}, callback);
};