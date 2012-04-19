
/**
 * Module dependencies.
 */

var routes = require('./routes')
  , stylus = require('stylus')
  , express = require('express')
  , http = require('http')
  , io = require('socket.io')
  , app = express()
  , server = http.createServer(app);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  
  app.use(stylus.middleware({
	src: __dirname + '/views',
	dest: __dirname + '/public'
  }));
  
  app.use(express.static(__dirname + '/public'));
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

io.listen(server).sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


server.listen(8000);

console.log("Express server listening on port 8000");

