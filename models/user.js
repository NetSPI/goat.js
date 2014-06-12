var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, unique: true, validate: { notNull: true, notEmpty: true}},
	password: {type: DataTypes.STRING, validate: { notNull: true, notEmpty: true}}
  },
  { 
	//define: {
		// Begin class methods
		classMethods: {
    		validPassword: function(password, passwd, done, user){
			  bcrypt.compare(password, passwd, function(err, isMatch) {
				  if (err) console.log(err)
				  if (isMatch) {
					return done(null, user ) 
				  } else {
					return done(null, false)
				  }
			  });
			}
		} // End of Class methods definition
	}, // end of define:
  {
	  dialect: 'mysql'
  }
  
);

User.hook('beforeCreate', function(user, fn) {
  //user.password = "yoyoyo"  
  var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
       return salt
  });	
   bcrypt.hash(user.password, salt, null, function(err, hash) {
        if(err) return next(err);
         user.password = hash;
	   	 return fn(null, user)
   });
 
})


 //var user = User.create({ id: 1, username: "admin", password: "bolognese" }).save;
  return User
};

