const path = require('path');

const child = require('child_process').fork(path.join(__dirname, 'network-child.js'));
const server = require('net').createServer();

server.on('connection', (socket) => {
  socket.end('parent handled connection');
});

server.listen(8080, () => {
  child.send('Parent passing down server', server);
});
