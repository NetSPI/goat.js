var express = require('express')
    , routes  = require('./routes')
	, app = express()
	, user = require('./routes/user')
	, db = require('./models')
	, http    = require('http')
	, passport = require('passport')
	, test = require('./routes/test')
	, passportConfig = require('./config/passport')


// Pull in the public directory
app.use('/public', express.static(__dirname + '/public'));

// Set Views folder
app.set('views', __dirname + '/views')


// configuration
app.set('port', process.env.PORT || 3003)
app.use(express.urlencoded())
app.use(express.bodyParser())
app.use(express.cookieParser() );
app.use(express.session({ secret: 'goatjsformakebettersecurity' }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(app.router)

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}


//routes 
app.get('/', routes.index)
app.get('/test', test.works)
app.post('/authenticate',
	passport.authenticate('local', { 
			successRedirect: '/test',
	    	failureRedirect: '/',
	    	failureFlash: true 
		})
)
app.get('/signup', user.signUp)
app.post('/register', user.register)

db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })


var a = db.User.create({ username: "admin", password: "bolognese" });