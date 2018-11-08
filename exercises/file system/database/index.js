/* eslint-disable consistent-return */

const Database = require('./database');

const client = new Database('./test.db');

client.on('load', () => {
  const foo = client.get('foo');

  client.set('bar', 'my sweet value', (err) => {
    if (err) return console.error(err);
    console.log('write succesful');
  });

  client.del('baz');
});
