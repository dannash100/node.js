/* eslint-disable no-console */
const net = require('net');

/*
Nagles algorithm is used to collect smaller packets within a larger payload.
Nagles algorithm states that when a connection has unacknowledged data, small segments
should be retained, these segments will be batched into larger segments to transmit when
sufficient data has been acknowledged by the recipient.

example below shows how to turn off Nagles Algorithm to include connection latency
in some cases such as single character REPL transmitons.
*/


const server = net.createServer((c) => {
  c.setNoDelay(true);
  c.write('377375042377373001', 'binary');
  console.log('server connected');
  c.on('end', () => {
    console.log('server disconnected');
    server.unref();
  });
  c.on('data', (data) => {
    process.stdout.write(data.toString()); // print characters from client to the server's terminal
    c.write(data.toString());
  });
});

server.listen(8000, () => {
  console.log('server bound');
});
