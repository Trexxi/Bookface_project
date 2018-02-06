var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index:true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(req, res) {
    /*var user = {
        email: req.body.email,
        password:req.body.password
    };*/

    var user = {
        email:'linusbeck@hotmail.com',
        password: 'hehe123'
    };
    console.log("user: ",user);
  var token = jwt.sign(user,process.env.JWT_KEY, {expiresIn: "1h"});
        return res.status(200).json({
            message: "Auth successful",
            token:token
        });
};