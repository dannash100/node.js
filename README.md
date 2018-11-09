# node.js
A deeper look into node.js 

## Notes taken in the process of following *Node.js in Practice by Alex R. Young and Marc Harter (Manning)*
Note: I adapted the examples to make use of ECMAScript 2015 Class syntax, as the book was published before these where available. 

### Streams
*See examples for parsers, webservers, error handling.* 
- allows data to be dynamically processed as it is available and then released when its no longer needed.
- managing and modeling data asynchronously and efficiently. 
- ReadStreams can read files a buffers worth at a time and send it to the client. 
- allow interal buffer to be configured with size parameter.


```javascript
class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    console.log(chunk);
  }
}
```

#### Stream Classes
| Class        | Usage           | 
| ------------- |-------------|
| Readable      | wrap around an underlying I/O source with a streamable API |
| Writeable      | get output from a program to use elsewhere or send data elsewhere in the program |
| Transform | change data by parsing it |
| Duplex | wrap data source that can also receive messages |
| PassThrough | extract data from streams without changing, for testing and analysis |

### Buffers
Most of the details of this goes over my head, but I will return in future. 
``` let buf = Buffer(data, encoding) ```
- raw allocations of the heap, array-like when interacting with them 
- array-like when interacting with them. To write to the first byte: ```buffer[0] = 23```
- can be used to change encodings i.e utf161e, base64, hex 
- buffers can be used to convert binary data into more usable formats
  binary formats can be decoded manually as they usually have a header which contains metadata about the file. This can then be   used to interpret sections of bytes.
- binary protocols can be used for an efficient way to transport messages across a network or process. 

### Events
```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```
Familiar with this syntax from Electron and Sockets.io
- inherit from EventEmitter class to create customs classes.
- events distingued by a string specifying the events name.
-```.on``` to listen for events, ```.emit``` to trigger a event, ```.removeListener``` to remove. ```.once``` responds once.
##### Error Handling
- bind a listener to 'error' event to handle errors ```myEmitter.on('error', (err) => console.error('Error:', err)```
- nodes domain API can be used to centralize error handling when more complex I/O operations are being used.
##### Reflection
*see reflection.js for examples*
- dynamicly respond to changes to an instance of an EventEmitter, or query its listeners. utilizes ```"new-Listener``` event
- ```myEmmiter.listeners(eventName)``` to query listeners - returns a copy of the array of listeners for the event named eventName. 
- in larger projects avoid writing event names in strings and instead categorize names with a central dictionary/object for   all the event names. ``` myEmitter.events = { event: 'eventName' }```

### File System
- POSIX file operations, file streaming, bulk file I/O and file watching

###### Lockfiles 
*see exercises lockfile_module for example usage and mechanism to remove lockfiles when they are done.*

- ensure the integrity of a file and that and data isn't lost when multiple processes are accessing a file. 
```javascript
fs.open('config.lock', 'wx', () => {
});

fs.writeFile('config.lock', process.pid, {flags: 'wx'}, () => {
});

fs.mkdir('config.lock', (err) => {
  if (err) return console.error(err);
  fs.writeFile('config.lock/' + process.pid, (err) => {
    if (err) return console.error(err)
  })
})
```
- wx flag - open in exclusive write mode 
- writing process.pid to lockfile will expose what process had the lock last.
- use mkdir to create a lockfile as a directory which stores the PID as a file

###### Custom Databases
*see database exercise for simple database module and usage*

###### Watching Files
