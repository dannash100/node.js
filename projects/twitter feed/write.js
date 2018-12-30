/* eslint-disable no-plusplus */

const fs = require('fs');
const crypto = require('crypto');
// establish a stream pointer to file that our service is watching.

const tweetFile = 'tweets.txt';
const writeStream = fs.createWriteStream(tweetFile, {
  flags: 'a',
});

// tweets are never longer than 140 bytes, simplified by always writing in 140 byte chunks

const cleanBuffer = (len) => {
  const buf = Buffer.alloc(len);
  buf.fill('\0');
  return buf;
};

/*
every 10 seconds collect a message, calculate number of byes necisary
*/

const randomNumber = () => Math.floor(Math.random() * 100) + 1;
const getTweet = () => crypto.randomBytes(70).toString('hex');

const check = () => {
  const tweets = [];
  for (let i = 0; i < randomNumber(); i++) {
    tweets.push(getTweet());
  }
  const buffer = cleanBuffer(tweets.length * 140);
  tweets.forEach((obj, idx) => {
    buffer.write(obj, idx * 140, 140);
  });
  writeStream.write(buffer);
  setTimeout(check, 10000);
};

check();
