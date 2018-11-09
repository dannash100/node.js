/* eslint-disable class-methods-use-this */
const stream = require('stream');

class GreenStream extends stream.Writable {
  _write(chunk, encoding, callback) {
    process.stdout.write(`\x1b[32m${chunk}`);
    callback();
  }
}

process.stdin.pipe(new GreenStream());
