/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */

const stream = require('stream');

const Feed = function () {
  const readable = new stream.Readable({});
  const news = [
    'Big Win!',
    'Stocks Down!',
    'Actor Sad!',
  ];
  readable._read = () => {
    if (news.length) {
      return readable.push(`${news.shift()}\n `);
    }
    readable.push(null);
  };
  return readable;
};

const feed = new Feed();

feed.on('readable', () => {
  const data = feed.read();
  data && process.stdout.write(data);
});

feed.on('end', () => console.log('no more news'));
