
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('short'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("test"));
app.use(express.session({
	secret: 'test',
	maxAge: 3600000
}));
app.use(function (req, res, next) {
	res.locals.user = req.session.user;
	next();
});


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/session')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
