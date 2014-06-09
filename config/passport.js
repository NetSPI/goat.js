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
	console.log("Before")
    db.User.find({where: {username: username}}).success(function (user){
		if (user && user.password == password) {
			return done(null, user);
		} else {
		    return done(null, false);
		}
	})
	  console.log("After")
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
