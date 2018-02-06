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
        type: 'Moment'
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