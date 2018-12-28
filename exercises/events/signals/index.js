// starts a long interval so node doesn't exit.
// subscribes to SIGINT signal sent on detection of a Ctrl + C keystroke.

console.log('Running...');

setInterval(() => {}, 1e6);

process.on('SIGINT', () => {
  console.log('We received the SIGINT signal');
  process.exit(1);
});
