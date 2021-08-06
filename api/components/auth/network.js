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
    console.log('llegue a la url', req.token);
    return success(req,res,req.token,200)
  } catch (error) {
    next(error)
  }
})
  



module.exports = auth;