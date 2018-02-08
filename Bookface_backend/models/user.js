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
    var user = {
        username: req.body.username,
        password:req.body.password
    };

    /*TODO: Use user from database instead*/
        console.log("user: ",user);
        var token = jwt.sign(user,process.env.JWT_KEY, {expiresIn: "1h"});
        process.env.JWT_TOKEN = token;
        console.log(req.headers.cookie);
        return res.status(200).json({
            message: "Auth successful",
            token:token,
            cookie:req.headers.cookie,
            wefwefewf:undefined
        });
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

module.exports.changePassword = function(newPassword, user) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newPassword, salt, function(err, hash) {
            user.password = hash;
            user.save(user);
        });
    });
};

//TODO: implement check if user exists and call it in create user