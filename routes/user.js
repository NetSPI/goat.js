var db = require('../models')

exports.signUp = function(req, res) {
    res.render("signup.ejs");
};

exports.register = function(req, res){
	db.User.find({where: {username: req.username}}).success(function (user){
		if (!user) {
			db.User.create({ username: req.body.username, password: req.body.password }).error(function(err){
				console.log(err);
			});
		} else {
			res.redirect('/signup') 
		}
	})
	res.redirect('/') 
};

exports.update = function(req, res) {
	
	if (req.body.new_password = req.body.new_password_confirmation){
        username = req.body.username
        current_password = req.body.current_password
        isMatch = true
       
        db.User.find({where: {username: username}}).success(function (user){
            hash = user ? user.password : ''
            isMatch = db.User.validPassword(current_password, hash, function () { console.log('check password') } , user)
        });
        if (isMatch) {
            req.user.username = username
            req.user.password = req.body.new_password
            req.user.save()
        } else {
            console.log('Bad Password')
        }
	}
  
    res.redirect('/account')
};

/*
exports.update = function(req, res) {
	var t = function(cb, user) {
	   if (user) {
		 req.user.password = req.body.new_password
		 req.user.save()
	   }
	}
	if (req.body.new_password = req.body.new_password_confirmation){
		db.User.validPassword(req.body.current_password, req.user.password, t, req.user)
	}
  
    res.redirect('/account')
};*/