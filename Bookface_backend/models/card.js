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
        type: 'Moment'
    }
});

var Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.hehe = function(log) {
    console.log(log);
    console.log(log);
    console.log(log);


    console.log(log);
    console.log(log);
    console.log(log);
};