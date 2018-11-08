/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

const fs = require('fs');
const zlib = require('zlib');

/* hrtime gets precise nanosecond measurements */

const benchStream = (inSize, outSize) => {
  const time = process.hrtime();
  let watermark = process.memoryUsage().rss;
  const input = fs.createReadStream('/usr/share/dict/words', {
    bufferSize: inSize,
  });
  const gzip = zlib.createGzip({ chunkSize: outSize });
  const output = fs.createWriteStream('out.gz', { bufferSize: inSize });

  const memoryCheck = setInterval(() => {
    const { rss } = process.memoryUsage();
    if (rss > watermark) watermark = rss;
  }, 50);

  input.on('end', () => {
    clearInterval(memoryCheck);

    const diff = process.hrtime(time);
    console.log([
      inSize,
      outSize,
      (diff[0] * 1e9 + diff[1]) / 1000000,
      watermark / 1024].join(', '));
  });

  input.pipe(gzip).pipe(output);

  return input;
};

console.log('file size, gzip size, ms, RSS');

let fileSize = 128;
let zipSize = 5024;

const run = (times) => {
  benchStream(fileSize, zipSize).on('end', () => {
    times--;
    fileSize *= 2;
    zipSize *= 2;

    if (times > 0) {
      run(times);
    }
  });
};

run(10);
