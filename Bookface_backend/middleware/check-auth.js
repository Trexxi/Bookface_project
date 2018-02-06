var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        /**
         * validates token and continues if valid
         */
        var decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        //pass to req of future routes
        req.userData = decoded;
        next();
    } catch(error) {
        /**
         * Message if token is invalid
         */
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};