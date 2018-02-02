var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var users = [
        {
            name:'Beck Linusman',
            date:moment()

        },
        {
            name:'Trexxitrice teddysson',
            date:moment()

        }
    ];
    res.json(users);
});

module.exports = router;