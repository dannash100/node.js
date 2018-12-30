// _write fires the callback imediately after writing, this call is important for indicating the status of the write
// call to write returns true. Indiciating that the internal buffer of Writable implementaiton has empties after executing requested write.

const stream = require('stream');

class Writable extends stream.Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback();
  }
}

let writable = new Writable({decodeStrings: false})

let myWritable = writable.write(Buffer.alloc(32, 'A'))
writable.end()

console.log(myWritable)
