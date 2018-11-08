/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */

const fs = require('fs');

const lockDir = 'config.lock';
let hasLock = false;

exports.lock = (cb) => {
  if (hasLock) return cb();

  fs.mkdir(lockDir, (err) => {
    if (err) return cb(err);
    hasLock = true;
    return cb();
  });
};

exports.unlock = (cb) => {
  if (!hasLock) return cb();

  fs.unlink(`${lockDir}/${process.pid}`, (err) => {
    if (err) return cb(err);
    fs.rmdir(lockDir, (err) => {
      if (err) return cb(err);
      hasLock = false;
      cb();
    });
  });
};

process.on('exit', () => {
  if (hasLock) {
    fs.unlinkSync(`${lockDir}/${process.pid}`);
    fs.rmdirSync(lockDir);
    console.log('remove lock');
  }
});
