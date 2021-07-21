const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = express.Router();
const { authenticate } = require('../../../middlewares/authenticateHandler');
const config = require("../../../config");
const { success } = require("../../../response/succes");

// Basic strategy
require("../../../auth/strategies/basic");

auth.post("/token", authenticate, async function(req, res, next) {
  try {
    success(req,res,token,200)
  } catch (error) {
    
  }
  

/*  passport.authenticate("basic", function(error, user) {
    try {
      console.info("ya pase por passport")
      console.log(error,user)

      if (error || !user || user == undefined) {
        success(req,res,'unauthorized',401)
      }

      req.login(user, { session: false }, async function(error) {
        if (error) {
          next(error);
        }

        const payload = { sub: user[0].username };
        const token = jwt.sign(payload, config.jwt.authJwt, {
          expiresIn: "15m"
        });
        success(req,res,token,200)
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next); */
}); 



module.exports = auth;