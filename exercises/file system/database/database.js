/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const { EventEmitter } = require('events');

class Database extends EventEmitter {
  constructor(path) {
    super();
    this.path = path;
    this._records = Object.create(null);
    this._writeStream = fs.createWriteStream(this.path, {
      encoding: 'utf8',
      flags: 'a',
    });
    this._load();
  }

  _load() {
    const stream = fs.createReadStream(this.path, {
      encoding: 'utf8',
    });
    const database = this;

    let data = '';
    stream.on('readable', () => {
      data += stream.read();
      const records = data.split('\n');
      data = records.pop();
      records.forEach((record) => {
        try {
          record = JSON.parse(record);
          if (record.value == null) delete database._records[record.key];
          else database._records[record.key] = record.value;
        } catch (e) {
          database.emit('error', 'found invalid record:', record);
        }
      });
    });
    stream.on('end', () => {
      database.emit('load');
    });
  }

  get(key) {
    return this._records[key] || null;
  }

  set(key, value, cb) {
    const toWrite = `${JSON.stringify({ key, value })}\n`;

    if (value == null) delete this._records[key];
    else this._records[key] = value;

    this._writeStream.write(toWrite, cb);
  }

  del(key, cb) {
    return this.set(key, null, cb);
  }
}

module.exports = Database;
