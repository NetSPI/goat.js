var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, unique: true, allowNull: false, notEmpty: true},
	password: {type: DataTypes.STRING, allowNull: false, notEmpty: true},
  },
  {
	  dialect: 'mysql'
  },
  {
	// Begin class methods
	classMethods: {
    	
	} // End of Class methods definition
  }
)

 //var user = User.create({ id: 1, username: "admin", password: "bolognese" }).save;
  return User
};

