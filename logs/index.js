import EventEmitter from 'node:events'
import fs from 'node:fs'
import readline from 'node:readline'

class LogProcesssor extends EventEmitter {
  constructor() {
    super()
  }
}

const eventLog = new LogProcesssor();
const errorStream = fs.createWriteStream('./error.log');

eventLog.on('line', (log) => {
  if(log.includes('ERROR')) {
    errorStream.write(`${log}\n`)
    console.log(`Error found: ${log}`)
  }
})

eventLog.on('finish', () => {
  console.log('Finished processing logs.')
  errorStream.end();
})

const fileStream = fs.createReadStream('./server.log');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  eventLog.emit('line', line)
})

rl.on('close', () => {
  eventLog.emit('finish')
})
