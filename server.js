var express = require('express');
var socket = require('socket.io');

//express init
var app = express();

//static files Middleware
app.use(express.static(process.cwd() + '/public'));

//server init
var port = 4000;
var server = app.listen(port, function () {
  console.log('Server running on port ' + port);
});

//Web socket init
var io = socket(server);
io.on('connection', function (socket) {
  console.log('Made socket connection with client!');
  
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

});

