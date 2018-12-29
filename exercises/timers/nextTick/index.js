/* in the following example without nextTick The event emitter instantiated within getEmitter
emits start previous to being returned, wrong-footing the subsequent assignment of a listener,
which arrives a step late, missing the event notification.
*/

const events = require('events');

const getEmitter = () => {
  const emitter = new events.EventEmitter();
  process.nextTick(() => {
    emitter.emit('start');
  });
  return emitter;
};

const myEmitter = getEmitter();

myEmitter.on('start', () => {
  console.log('started');
});
