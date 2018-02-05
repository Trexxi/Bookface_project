var mongoose = require('mongoose')
require('mongoose-moment')(mongoose);

// User Schema
var CardSchema = mongoose.Schema({
    firstName: {
        type: String,
        index:true
    },
    lastName: {
        type: String
    },
    isTired: {
        type: Boolean,
        default:true
    }
});

var Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.createNewCard = function(newCard) {
    newCard.save();
};