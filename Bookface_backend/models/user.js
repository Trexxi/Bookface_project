var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
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

module.exports.logUserIn = function(req, res) {
    /*var user = {
        email: req.body.email,
        password:req.body.password
    };*/
    var user = {
        email:'linusbeck@hotmail.com',
        password: 'hehe123'
    };

    console.log(req.body);
    /*TODO: Use user from database instead*/
    if(req.body.email === user.email) {
        console.log("user: ",user);
        var token = jwt.sign(user,process.env.JWT_KEY, {expiresIn: "1h"});
        return res.status(200).json({
            message: "Auth successful",
            token:token
        });
    } else {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
};

/**
 * Needs:
 * ------name
 * ------email
 * ------username
 * ------password
 */
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};

module.exports.changePassword = function(password, user) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            user.password = hash;
            user.save(user);
        });
    });
};