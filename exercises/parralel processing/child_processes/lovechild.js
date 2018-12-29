// child receives message and sends one back up

process.on('message', (msg) => {
  console.log('Parent said: ', msg);
  process.send('I love you too');
});
