import fs from 'node:fs';
const stream = fs.createWriteStream('./server.log');

for (let i = 0; i < 10000; i++) {
  stream.write(`INFO: User ${i} logged in\n`);
  if (i % 100 === 0) stream.write(`ERROR: Database failed at index ${i}\n`);
}
stream.end();
