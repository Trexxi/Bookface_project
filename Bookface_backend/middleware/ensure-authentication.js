/**
 * this is an option to check-auth,
 * usage of this deppends on
 */

module.exports.ensureAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.status(401).json({
            message: 'You need to be authenticated to access this route.'
        })
    }
}