var io = require('socket.io');

var text = "";

module.exports.listen = function(app){
    io.listen(app).on('connection', function (socket) {
	  socket.emit('display text', { content: text });
	  socket.on('store text', function (data) {
	    text = data.content;
	    socket.broadcast.emit('display text', { content: text });
	  });
	});
}