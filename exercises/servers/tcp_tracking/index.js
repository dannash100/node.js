/* eslint-disable no-console */
const net = require('net');

let clients = 0;

// $ telnet localhost 8000

const server = net.createServer((client) => {
  clients += 1;
  const clientId = clients;
  console.log('client connected', clientId);

  client.on('end', () => {
    console.log('client disconnected', clientId);
  });

  client.write(`welcome client: ${clientId}rn`);
  client.pipe(client);
});

server.listen(8000, () => {
  console.log('Server started on port 8000');
});
