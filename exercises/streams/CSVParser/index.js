/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

const fs = require('fs');
const stream = require('stream');
const path = require('path');

/* data turned into a string then iterated over character by character
if character is a comma, add the previously collected data to the interal list of headers or values
if character is a '\n' - record the previously collected field and then push json version to queue.
headers are assumed to be on the first line */

class CSVParser extends stream.Transform {
  constructor(options) {
    super(options);
    this.value = '';
    this.headers = [];
    this.values = [];
    this.line = 0;
  }

  _transform(chunk, encoding, done) {
    chunk = chunk.toString();
    for (let i = 0; i < chunk.length; i++) {
      const c = chunk.charAt(i);
      if (c === ',') {
        this.addValue();
      } else if (c === '\n') {
        this.addValue();
        if (this.line > 0) {
          this.push(JSON.stringify(this.toObject()));
        }
        this.values = [];
        this.line++;
      } else {
        this.value += c;
      }
    }
    done();
  }

  toObject() {
    const obj = {};
    for (let i = 0; i < this.headers.length; i++) {
      obj[this.headers[i]] = this.values[i];
    }
    return obj;
  }

  addValue() {
    if (this.line === 0) {
      this.headers.push(this.value);
    } else {
      this.values.push(this.value);
    }
    this.value = '';
  }
}

const parser = new CSVParser();
fs.createReadStream(path.join(__dirname, '/sample.csv'))
  .pipe(parser)
  .pipe(process.stdout);
