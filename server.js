var express = require('express');
var app = express();
var passport = require('passport');

app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
