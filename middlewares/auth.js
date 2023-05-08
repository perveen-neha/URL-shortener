const {getUser} = require('../service/auth')

function checkForAuthentication (req, res, next) 
{
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next()
    
    const token = authorizationHeaderValue.split('Bearer ')[1];
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(role) {
    return function(req, res, next) {
      if(!req.user) return res.redirect('/login')
      if(!role.includes(req.user.role)) res.end('Not Authorized')
      next()
    }
  }



module.exports = {
    checkForAuthentication,
    restrictTo
}