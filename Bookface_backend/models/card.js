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
    date: {
        type: 'Moment',
        default:'Moment'
    },
    isTired: {
        type: Boolean,
        default:false
    }
});

var Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.createNewCard = function(newCard) {
    newCard.save();
};