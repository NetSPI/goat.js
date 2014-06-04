var express = require('express');
var app = express();

// Pull in the public directory
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render("login.ejs");
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
