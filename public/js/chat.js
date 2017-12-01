//Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var output = document.getElementById('output');
var handle = document.getElementById('handle');
var send = document.getElementById('send');

//Emit event
send.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
  handle.value = '';
});

//Lsiten for event on client
socket.on('chat', function (data) {
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

