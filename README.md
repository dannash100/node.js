# node.js
A deeper look into node.js

## Notes taken in the process of following *Node.js in Practice by Alex R. Young and Marc Harter (Manning) and Mastering Node.js by Sandro Pasquali & Kevin Faaborg (Packt)*
Note: I adapted the examples to make use of ECMAScript 2015 Class syntax, as the book was published before these where available.

### Event Loop

- alloqws node to perform non-blocking I/O operations despite JS being signle-threaded
- the event loop delegates many I/O operations to ```libuv``` which uses the OS itself such as thread pools.

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

- inherit from EventEmitter class to create customs classes.
- events distingued by a string specifying the events name.
-```.on``` to listen for events, ```.emit``` to trigger a event, ```.removeListener``` to remove. ```.once``` responds once.


#### Signals
*see signals project*

- listen and respond to POSIX signals - inter-process communications used in Unix and Unix-like systems.


##### Error Handling

- bind a listener to 'error' event to handle errors ```myEmitter.on('error', (err) => console.error('Error:', err)```
- nodes domain API can be used to centralize error handling when more complex I/O operations are being used.
-
##### Reflection
*see reflection.js for examples*
- dynamicly respond to changes to an instance of an EventEmitter, or query its listeners. utilizes ```"new-Listener``` event
- ```myEmmiter.listeners(eventName)``` to query listeners - returns a copy of the array of listeners for the event named eventName.
- in larger projects avoid writing event names in strings and instead categorize names with a central dictionary/object for   all the event names. ``` myEmitter.events = { event: 'eventName' }```

### File System
- POSIX file operations, file streaming, bulk file I/O and file watching

##### Lockfiles
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

##### Custom Databases
*see database exercise for simple database module and usage*

### Networking

##### Terminology
| Term        | Description        |
| ------------- |-------------|
| Layer      | A slice of related networking protocols. The application layer, where we work is the highest level, physical the lowest |
| HTTP      | Application-layer client-server protocol built on TCP. |
| TCP | Transmission Control Protocol - facilitates communication in both directions form the client to the server |
| UDP | User Datagram Protocol - lightweight protocol chosen for speed over reliability, cases when delivery isn't critical |
| Socket | combination of an IP address and a port number |
| Packet | TCP packets or segments - combination of a chunk of data along with a header |
| Datagram | UDP packet |
| MTU | Maximum Transmission Unit - maximum size of protocol data unit. Each layer can have an MTU: IPv4 is at least 68 bytes Ethernet v2 is 1,500 bytes |

- when talking to Node - we are communicating with the higher level application and transport layers of the Internet Protocol suite.
- in Internet Protocol, a host is identified by an IP address, IPv6 was developed because IP addresses where running out.
- TCP connections and sockets are made with ```net``` module inside node.
- IPv4 and IPv6 records can be queried with the ```dns``` module.
- encryption TCP connections with ```tls``` module: *Transport Layer Security*
 * this type of encryption is called public key cartography
 * both clients and servers must have private keys so clients can encrypt messages
 * a solid understanding of tls principles is important in the deployment of web apps with node.
- non-blocking networking and thread pools - asynchronous network API's

### util

#### util.promisify

converts a callback-based function into a promised-based one

```javascript
const {promisify} = require('util');
const fs = require('fs');

let readFileAsync = promisify(fs.readFile);
```

### Process Object

provides information on and controll over running processes

**get command-line arugmenets**
```$ node process.js 100000 100```
```javascript
process.argv[2] = 100000
process.argv[3] = 100
```

### Child Processes
*see child_processes project*

- create or fork processes when parralelizing execution or scaling a system.

### PID

to find process ID of a running process use
```ps aux | grep process_name.js```

