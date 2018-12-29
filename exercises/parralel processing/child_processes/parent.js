// running parent.js will fork a child process, causing two Node processes, not one

// parent gets a message up from child
// sends a message back down to child

const cp = require('child_process');
const path = require('path');

const child = cp.fork(path.resolve(__dirname, 'lovechild.js'));

child.on('message', (msg) => {
  console.log('Child said: ', msg);
});

child.send('I love you');
