/* eslint-disable no-console */
const events = require('events');


class EventTracker extends events.EventEmitter {}

const eventTracker = new EventTracker();

eventTracker.on('newListener', (name) => {
  console.log('Event name added:', name);
});

eventTracker.on('a listener', () => {
  // causes 'newListener' event to fire
});

// following example shows how to trigger events on 'newListener'.

class Pulsar extends events.EventEmitter {
  constructor(speed, times) {
    super();
    this.speed = speed;
    this.times = times;
    this.on('newListener', (eventName) => {
      if (eventName === 'pulse') this.start();
    });
  }

  start() {
    const id = setInterval(() => {
      this.emit('pulse');
      this.times = this.times - 1;
      if (this.times === 0) {
        clearInterval(id);
      }
    }, this.speed);
  }

  stop() {
    if (this.listenerCount('pulse') === 0) {
      throw new Error('no listeners have been added');
    }
  }
}

const pulsar = new Pulsar(500, 5);

pulsar.on('pulse', () => {
  console.log('.');
});
