var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, unique: true, validate: { notNull: true, notEmpty: true}},
	password: {type: DataTypes.STRING, validate: { notNull: true, notEmpty: true}}
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

User.hook('beforeCreate', function(user, fn) {
  //user.password = "yoyoyo"  
  var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
       return salt
  });

   bcrypt.hash("test", salt, null, function(err, hash) {
        if(err) return next(err);
         user.password = hash;
	   	//fn(null, user)
	   	 return fn(null, user)
   });
 
})


 //var user = User.create({ id: 1, username: "admin", password: "bolognese" }).save;
  return User
};

