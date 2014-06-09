var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user')
var db = require('../models')

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  db.User.find({where: {id: user.id}}).success(function(user){
    done(null, user);
  }).error(function(err){
    done(err, null);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.find({ username: 'admin' }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      //if (!user.validPassword(password)) {
       // return done(null, false, { message: 'Incorrect password.' });
     // }
      return done(null, user);
    });
  }
));

/*
passport.use(new LocalStrategy(function(username, password, done) { 
  // insert your MongoDB check here. For now, just a simple hardcoded check.
  if (username === 'foo' && password === 'bar')
  {
    done(null, { user: 1 });
  }
  else
  {
    done(null, false);
  }
}));
*/