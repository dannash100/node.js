/* eslint-disable no-console */
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const stream = fs.createReadStream('not-found');

// static web server

http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, '/index.html'), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end(String(err));
    }
  });
});

// streaming static web server.

http.createServer((req, res) => {
  fs.createReadStream(path.join(__dirname, '/index.html')).pipe(res);
}).listen(8000);

// static web server with gzip
// sets header to tell browser that gzip is being used with writeHead
// two calls to pipe to compress and then stream the file back to the client

http.createServer((req, res) => {
  res.writeHead(200, { 'content-encoding': 'gzip' });
  fs.createReadStream(path.join(__dirname, '/index.html'))
    .pipe(zlib.createGzip())
    .pipe(res);
}).listen(8000);

// Catching errors during streaming

stream.on('error', (err) => {
  console.trace();
  console.error('Stack:', err.stack);
  console.error('Error:', err);
});
