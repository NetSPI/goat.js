var db = require('../models');

exports.homepage = function(req, res){
	res.render("homepage.ejs", { myVar: req.user.username });
}

exports.account = function(req, res) {
	res.render("myAccount.ejs", { username: req.user.username });
}

exports.search = function(req,res) {
	q = "";
	users = [];
	if (req.query.q) {
        q = req.query.q;
		db.User.findAll({attributes: ['id', 'username'], where: {username: { like: '%'+req.query.q+'%' } }}).success(function(users){
			//console.log('Users:', users)
			res.render("search.ejs", { q: q, username: req.user.username, users: users });
		});
    } else {
		db.User.findAll().then(function(users){
			//console.log('Users:', users)
			res.render("search.ejs", { q: q, username: req.user.username, users: users });
		});
	}
	//res.render("search.ejs", { q: q, username: req.user.username, users: users })
}