const { BasicStrategy } = require("passport-http");
const passport = require("passport");
const mongo = require('../../store/mongo');
const bcrypt = require('bcrypt');
const {getQuery} = require("../../api/components/auth/controller");



passport.use(new BasicStrategy(
    async function(username, password, cb) {
      console.info("realizando auntenticación basica")
      console.log('datos recibidos',username,password);
      try {
              
          user = await getQuery({username})
          console.log('datos a devolver')
          console.log(user)
          if(!user){
            console.error('no existe el usuario');
            cb('error', false)
          }
          const match = await bcrypt.compare(password, user[0].password);
          if (!match) {
            console.error('error en bcrypt');
            cb('error', false)
          }
          return cb(null, user);
      } catch (error) {
        console.error('error en general');
        return cb(error, false);
      }    
    }
  ));