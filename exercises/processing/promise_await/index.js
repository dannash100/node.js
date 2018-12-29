/* since await expects a promise which promise.all will return,
run through every file that the readDir Promise returns,
and map each file to another awaited Promise that will handle any recursive descent.
update the acc where appropriate
*/

const { join } = require('path');
const { promisify } = require('util');
const fs = require('fs');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function $readDir(dir, acc = []) {
  await Promise.all((await readdir(dir)).map(async (file) => {
    file = join(dir, file);
    return (await stat(file)).isDirectory() && acc.push(file) && $readDir(file, acc);
  }));
  return acc;
}

$readDir('./dummy_filesystem').then(dirInfo => console.log(dirInfo));
