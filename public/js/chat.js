//Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var output = document.getElementById('output');
var handle = document.getElementById('handle');
var send = document.getElementById('send');
var feedback = document.getElementById('feedback');

//Emit event
send.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
  handle.value = '';
});

//Listen for keypress
message.addEventListener('keypress', function () {
  socket.emit('typing', handle.value);
});

//Listen for event on client
socket.on('chat', function (data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

//Update DOM when user is typing
socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

