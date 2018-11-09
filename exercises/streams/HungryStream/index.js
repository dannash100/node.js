const stream = require('stream');

class HungryStream extends stream.Duplex {
  constructor(options) {
    super(options);
    this.waiting = false;
  }

  _write(chunk, encoding, callback) {
    this.waiting = false;
    this.push(`\x1b[36m${chunk}\x1b[0m`);
    callback();
  }

  _read(size) {
    if (!this.waiting) {
      this.push('Feed me data! > ');
      this.waiting = true;
    }
  }
}

const hungryStream = new HungryStream();

process.stdin.pipe(hungryStream).pipe(process.stdout);
