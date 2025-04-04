const passport = require('passport');

const JwtStrategy = require('./jwt.strategy');
const LocalStrategy = require('./local.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
