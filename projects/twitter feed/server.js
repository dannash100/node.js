const fs = require('fs');
const http = require('http');

let theUser = null;
let userPos = 0;
const tweetFile = 'tweets.txt';

// store response representing pipe connecting server to client

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });
  theUser = response;

  response.write(`:${Array(2049).join(' ')}\n`);
  response.write('retry: 2000\n');

  response.socket.on('close', () => {
    theUser = null;
  });
}).listen(8080);

/*
response implements the writable stream interface. allowing client msging
pull buffers of 140 bytes out of the readable stream bound to our tweets.txt file
increment file position counter by one on each read
write this buffer to writable stream binding out server ot the client
when done queue up a recursive call of the same function using nextTick
repeating untill error, !data or disconnect
*/

const sendNext = (fd) => {
  const buffer = Buffer.alloc(140);
  fs.read(fd, buffer, 0, 140, userPos * 140, (err, num) => {
    if (!err && num > 0 && theUser) {
      userPos += 1;
      theUser.write(`data: ${buffer.toString('utf-8', 0, num)}\n\n`);
      return process.nextTick(() => {
        sendNext(fd);
      });
    }
  });
};
