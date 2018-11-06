/* eslint-disable no-console */
const stream = require('stream');
const util = require('util');
const fs = require('fs');
const path = require('path');

class JSONLineReader extends stream.Readable {
  constructor(options, source) {
    super(options);
    this.source = source;
    this.foundLineError = false;
    this.buffer = '';
  }

  _read() {
    if (this.buffer.length === 0) {
      const chunk = this.source.read();
      this.buffer += chunk;
    }
    const lineIndex = this.buffer.indexOf('n');
    if (lineIndex !== -1) {
      const line = this.buffer.slice(0, lineIndex);
      if (line) {
        const result = JSON.parse(line);
        this.buffer = this.buffer.slice(lineIndex + 1);
        this.emit('object', result);
        this.push(util.inspect(result));
      } else {
        this.buffer = this.buffer.slice(1);
      }
    }
  }
}

const input = fs.createReadStream(path.join(__dirname, '/json-lines.txt'), {
  encoding: 'utf8',
});
const jsonLineReader = new JSONLineReader(input);

jsonLineReader.on('object', (obj) => {
  console.log('pos:', obj.position, '- letter:', obj.letter);
});

/*
all custom readable classes must implement _read() method
when the class is ready for more data, call read() on the source
slice from start of the buffer to the first newline to grab some text to parse
emit an "object" event when a JSON record has been parsed
create an instance of JSONLineReader and give it a file stream to process.
*/
