var db = require('../models')

exports.signUp = function(req, res) {
    res.render("signup.ejs");
};

exports.register = function(req, res){
	db.User.find({where: {username: req.username}}).success(function (user){
		if (!user) {
			db.User.create({ username: req.username, password: req.password });
		}
	})
};