const express = require('express');
const util = require('util');
const stream = require('stream');

const app = express();

// piping content from a custom-readable stream

class StatStream extends stream.Readable {
  constructor(limit) {
    super();
    this.limit = limit;
  }

  _read() {
    if (this.limit === 0) {
      this.push();
    } else {
      this.push(util.inspect(process.memoryUsage()));
      this.push('n');
      this.limit = this.limit - 1;
    }
  }
}

app.get('/', (req, res) => {
  const statStream = new StatStream(10);
  statStream.pipe(res);
});

app.listen(3000);
