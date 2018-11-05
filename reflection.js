const events = require('events');

class EventTracker extends events.EventEmitter {}

const eventTracker = new EventTracker();

eventTracker.on('newListener', (name, listener) => {
  console.log('Event name added:', name);
});

eventTracker.on('a listener', () => {
  // causes 'newListener' event to fire
});

// trigger events on 'newListener' event

class Pulsar extends events.EventEmitter {
  constructor(speed, times) {
    super();
    this.speed = speed;
    this.times = times;
    this.on('newListener', (eventName, listener) => {
      if (eventName === 'pulse') this.start();
    });
  }

  start() {
    const id = setInterval(() => {
      this.emit('pulse');
      this.times--;
      if (this.times === 0) {
        clearInterval(id);
      }
    }, this.speed);
  }
}

const pulsar = new Pulsar(500, 5);

pulsar.on('pulse', () => {
  console.log('.');
});
