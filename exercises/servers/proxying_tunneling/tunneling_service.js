/* eslint-disable max-len */
// set up proxy server responding to http connect requests, then make a connect request.
// proxy receives our clients request object , the socket itself and the head (first packet) of the tunneling stream
// once we make a request to tunneling server. it will set up a remote socket connection to our destination and maintain this bridge
// between remote socket and client socket. allowing clients to connect in a sense anonymously to remote services.

const http = require('http');
const net = require('net');
const url = require('url');

const proxy = new http.Server();

proxy.on('connect', (request, clientSocket, head) => {
  const reqData = url.parse(`http://${request.url}`);
  const remoteSocket = net.connect(reqData.port, reqData.hostname, () => {
    clientSocket.write('HTTP/1.1 200 \r\n\r\n');
    remoteSocket.write(head);
    remoteSocket.pipe(clientSocket);
    clientSocket.pipe(remoteSocket);
  });
}).listen(8080);

const request = http.request({
  port: 8080,
  hostname: 'localhost',
  method: 'CONNECT',
  path: 'www.example.org:80',
});

request.end();

request.on('connect', (res, socket) => {
  socket.setEncoding('utf8');
  socket.write('GET / HTTP/1.1\r\nHost: www.example.org:80\r\nConnection: close\r\n\r\n');
  socket.on('readable', () => {
    console.log(socket.read());
  });
  socket.on('end', () => {
    proxy.close();
  });
});
