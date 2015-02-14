var child_process = require('child_process'),
  fs = require('fs'),
  util = require('util'),
  events = require('events');

function conversionProcess(infilePath, outfilePath) {
  var eventEmitter = new events.EventEmitter(),
    conversionArgs = [
      '-layout',
      infilePath,
      outfilePath
    ],
    conversionProcess = child_process.spawn('pdftotext', conversionArgs);

  conversionProcess.on('error', eventEmitter.emit);
  conversionProcess.on('exit', function() {
    var outfileContents = fs.readFileSync(outfilePath, 'utf8');
    eventEmitter.emit('finished', outfileContents)
  });
  return eventEmitter;
}

module.exports = conversionProcess;
