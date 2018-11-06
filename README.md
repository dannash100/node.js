# node.js
A deeper look into node.js 

## Notes taken in the process of following *Node.js in Practice by Alex R. Young and Marc Harter (Manning)*
Note: I adapted the examples to make use of ECMAScript 2015 Class syntax, as the book was published before these where available. 

### Streams
*See streams.js in examples for streaming static web servers and error handling*
- Allows data to be dynamically processed as it is available and then released when its no longer needed.
- managing and modeling data asynchronously and efficiently. 
- ReadStreams can read files a buffers worth at a time and send it to the client. 


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
  binary formats can be decoded manually as they usualy have a header which contains metadata about the file. This can then be   used to interpret sections of bytes.
- binary protocals can be used for an efficient way to transport messages across a network or process. 

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
- in larger projects avoid writing event names in strings and instead catagorize names with a central dictionary/object for   all the event names. ``` myEmitter.events = { event: 'eventName' }```










