# node.js
A deeper look into node.js 

## Notes taken in the process of following *Node.js in Practice by Alex R. Young and Marc Harter (Manning)*
Note: I adapted the exercises to make use of ECMAScript 2015 Class syntax, as the book was published before theses where available. 


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
EventEmitter class

