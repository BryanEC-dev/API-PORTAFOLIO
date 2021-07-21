const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");


const config = require('../../config');
const {getQuery} = require("../../api/components/auth/controller");
const mongo = require('../../store/mongo');


passport.use(
  
  new Strategy(
    {
      secretOrKey: config.jwt.authJwt,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
      console.log('jwt');
      try {
        const user = await getQuery({username : tokenPayload.sub});

        if (!user) {
          return cb('error', false);
        }

        return cb(null, user[0]);
      } catch (error) {
        return cb(error);
      }
    }
  )
);