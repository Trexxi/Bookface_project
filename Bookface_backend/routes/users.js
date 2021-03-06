var express = require('express');
var router = express.Router();
var moment = require('moment');
var Card = require('../models/card');
var User = require('../models/user');
var Image = require('../models/image');
var checkAuth = require('../middleware/check-auth.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var fs = require('fs');

/**
 * Start of passport code
 * =====================================================================================================================
 */
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});
/**
 * End of passport code
 * =====================================================================================================================
 */



/* GET users listing. */
/**
 * if you want to checkAuth here you might have to make it a post request, and then return the data.
 * So that the front-end can get it and render it
 */
router.post('/', checkAuth, function(req, res, next) {
    Card.findAllCards(req, res);
});

router.post('/newCard', checkAuth, function(req, res, next) {

    var cardData = {
        message:req.body.message,
        date: req.body.date,
        user: req.user._id
    };

    var newCard = new Card(cardData);
    console.log(req.user._id,"ewfkoewfpoewkofewkofwepofkewpofkewofewfoewfewopkfewpofkewpofewkpofewk");
    console.log(newCard);
    Card.createNewCard(newCard, res);
    res.end();
});


/*TODO:use delete*/
router.post('/deleteCard', checkAuth, function(req, res, next) {
    Card.deletePost(req.body._id);
    res.send('deleteddddd');
    res.end();
});

/*TODO:use put*/
router.post('/updateCard', checkAuth, function(req, res, next) {
    console.log(req.body,"req");
    Card.updateCard(req.body._id, req.body.message, req.body.date);
    res.send('updated');
    res.end();
});

router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
    console.log("this is the shti", req.body);
        User.logUserIn(req, res);
});

router.post('/getImage', checkAuth, function(req, res, next){
    Image.getImage(req, res);
});

router.post('/uploadImage', checkAuth, function(req, res, next) {
    if(typeof req.body.imageBinary !== "undefined") {
        var ImageData = new Image({
            img:{
                data: req.body.imageBinary,
                contentType: 'image/png'
            },
            user:req.user._id
        });
        Image.saveImage(ImageData);
        res.status(200).json({
            message: "gj xD"
        });
    } else {
        res.status(500).json({
            message: "No image was sent"
        });
    }

});

router.post('/change-password', checkAuth, function(req, res, next) {
    console.log(req.body.newPassword);
    console.log(req.user);

    User.changePassword(req.body.newPassword,req.user);
    res.status(200).json({
        message: 'Password changed',
        user:req.user,
        token:process.env.JWT_TOKEN
    });
});

router.post('/logout', function(req, res, next) {
    console.log(req.user, " :is now being logged out");
    //check if user exists
    req.logOut();
    console.log(req.user);
    res.status(200).json({
        message: 'Logout successful'
    });
});

router.post('/createUser', function(req, res, next) {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.createUser(newUser,function(err, user) {
        if(err) throw err;
        console.log("following user has been created: ", user);
        res.status(200).json({
            user:user
        });
    });
});

router.post('/testarSaker', checkAuth, function(req, res, next) {
    res.status(200).send('ja bror');
    res.end();

});

module.exports = router;