var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var users = [
        {
            firstName:'beck',
            lastName: 'linusman',
            date:moment(),
            isTired: true

        },
        {
            fistName: 'trexxytrice',
            lastName: 'teddysson',
            date:moment(),
            isTired: true

        }
    ];
    res.json(users);
});

module.exports = router;