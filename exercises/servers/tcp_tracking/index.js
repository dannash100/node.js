/* eslint-disable max-len */
/* eslint-disable no-console */
const net = require('net');
const assert = require('assert');

let clients = 0;
let expectedAssertions = 2;

// node index - $ telnet localhost 8000
// net connect is used to connect to server by port number, returns a EventEmmiter to listen to events


const server = net.createServer((client) => {
  clients += 1;
  const clientId = clients;
  console.log('client connected', clientId);

  client.on('end', () => {
    console.log('client disconnected', clientId);
  });

  client.write(`welcome client: ${clientId}\r\n`);
  client.pipe(client);
});


const runTest = (expectedId, done) => {
  const client = net.connect(8000);

  client.on('data', (data) => {
    const expected = `welcome client: ${expectedId}\r\n`;
    assert.equal(data.toString(), expected);
    expectedAssertions -= 1;
    client.end();
  });
  client.on('end', done);
};

server.listen(8000, () => {
  console.log('Server started on port 8000');
  runTest(1, () => {
    runTest(2, () => {
      assert.equal(0, expectedAssertions);
      server.close();
    });
  });
});
