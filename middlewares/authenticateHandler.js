const passport = require('passport');
const jwt = require("jsonwebtoken");
const config = require('../config');
const { success } = require('../response/succes');
const { error } = require('../response/error');

// jwt strategy
require('../auth/strategies/jwt')

// Basic strategy
require("../auth/strategies/basic");

/* exports.verifyUser = passport.authenticate('jwt', {session: false}); */

exports.verifyUser = function(req,res,next){
  passport.authenticate("jwt", function(error, user) {
    try {
      if (error || !user || user == undefined) {
        success(req,res,'unauthorized',401)
      }

      req.login(user, { session: false }, async function(error) {
        if (error) {
          next(error);
        }
        next()
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
  
}

exports.authenticate = function (req,res,next) {
    passport.authenticate("basic", function(error, user) {
        try {
          console.info("ya pase por passport basic")
          console.log(error,user)
    
          if (error || !user || user == undefined) {
            next(error)
            //success(req,res,'unauthorized',401)
          }
    
          req.login(user, { session: false }, async function(error) {
            if (error) {
              next(error)
            }
            
            
            const payload = { sub: user[0].username, id :user[0]._id  };
            const token = jwt.sign(payload, config.jwt.authJwt, {
              expiresIn: "90m"
            });
            req.token = token
            next()
          });
        } catch (error) {
          next(error)
         
        }
      })(req, res, next);
}


exports.verifyAdmin = function(req,res,next){
  if(!req.user.admin){
    //error(req, res, "Unauthorized", 403, "Unauthorized")
    next(error)
  }

  return next()
  
}