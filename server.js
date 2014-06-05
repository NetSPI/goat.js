var express = require('express')
    , routes  = require('./routes')
	, app = express()
	, user = require('./routes/user')
	, db = require('./models')
	, http    = require('http')


// Pull in the public directory
app.use('/public', express.static(__dirname + '/public'));

// Set Views folder
app.set('views', __dirname + '/views')

app.set('port', process.env.PORT || 3003)
app.use(express.urlencoded())
app.use(app.router)

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

//routes 
app.get('/', routes.index)
app.post('/authenticate', user.authenticate)




db
  .sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })