var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, unique: true, validate: { notNull: true, notEmpty: true}},
	password: {type: DataTypes.STRING, validate: { notNull: true, notEmpty: true}},
  },
  {
	  dialect: 'mysql'
  },
  {
	// Begin class methods
	classMethods: {
    	hashPassword: function(password){
			return password
		}
	} // End of Class methods definition
  }
)

User.hook('beforeValidate', function(user, fn) {
  user.password = "yoyoyo"  
  fn(null, user)
})


 //var user = User.create({ id: 1, username: "admin", password: "bolognese" }).save;
  return User
};

