var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user')
var db = require('../models')
var bcrypt = require('bcrypt-nodejs')

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
	console.log(password)
    db.User.find({where: {username: username}}).success(function (user){
		passwd = user ? user.password : ''
	    bcrypt.compare(password, passwd, function(err, isMatch) {
	        if(err) return done(err);
			console.log(isMatch)
	        if (isMatch) {
			  return done(null, user);
			} else {
			  return done(null, false);
			}
	    });
	})
  }
));
