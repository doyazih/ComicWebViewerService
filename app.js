
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

var config = require('./app.config');

// all environments
app.set('port', config.WebPort || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/list', routes.list);
app.get('/list/:name', routes.list);
app.get('/list/:name/:bookno', routes.list);

app.get('/viewer/:name', routes.viewer);
app.get('/viewer/:name/:bookno', routes.viewer);
app.get('/viewer/:name/:bookno/:page', routes.viewer);

app.get('/viewer2/:name', routes.viewer2);
app.get('/viewer2/:name/:bookno', routes.viewer2);
app.get('/viewer2/:name/:bookno/:page', routes.viewer2);

app.get('/comics/:name/:bookno/:page', routes.comics);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
