const locker = require('./locker');

locker.lock((err) => {
  if (err) throw err;
});

// file modifications

locker.unlock();
