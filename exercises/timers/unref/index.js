// once the external source gets cleaned up (in 100 minilliseconds), the process will terminate

setTimeout(() => {
  console.log('now stop');
}, 100);

const intervalId = setInterval(() => {
  console.log('running');
}, 1);

intervalId.unref();
