const passport = require('passport');

const LocalStrategy = require('./auth/strategies/local.strategy');

passport.use(LocalStrategy);
