var express = require('express');
var router = express.Router();
var moment = require('moment');
var Card = require('../models/card');
var User = require('../models/user');
var checkAuth = require('../middleware/check-auth.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
router.get('/', function(req, res, next) {
    Card.findAllCards(req, res);
});

router.post('/newCard', function(req, res, next) {
    var cardData = req.body;
    console.log(req.body);
    var newCard = new Card(cardData);
    Card.createNewCard(newCard);
    res.send('s1ck');
    res.end();
});


/*TODO:use delete*/
router.post('/deleteCard', function(req, res, next) {
    Card.deletePost(req.body._id);
    res.send('deleteddddd');
    res.end();
});

/*TODO:use put*/
router.post('/updateCard', function(req, res, next) {
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

router.get('/logout', checkAuth, function(req, res, next) {
    console.log(req.user, " :is now being logged out");
    req.logout();
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