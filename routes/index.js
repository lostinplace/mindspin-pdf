var express = require('express'),
  router = express.Router(),
  http = require('http'),
  temp = require('temp'),
  pdfConverter = require('../convertPdf');

/* GET home page. */
router.get('/', function(req, res, next) {
  var documentUrl = req.param('url');
  if (!documentUrl) {
    res.render('index', {
      title: 'PDF Converter'
    });
  } else {
    console.log(documentUrl);
    var request = http.get(documentUrl, function(response) {
      var tmpFileStream = temp.createWriteStream();
      response.pipe(tmpFileStream);
      response.on('end', function() {
        var infilePath = tmpFileStream.path,
          outfilePath = temp.path();

        var conversionProcess = pdfConverter(infilePath, outfilePath);
        handleConversionProcess(conversionProcess, res);

      });
    });
  }
  temp.cleanup();
});

function handlePostRequest(req, res, next) {
  var pdfFile = req.files.pdf,
    outfilePath = temp.path();
  infilePath = pdfFile.path;

  var conversionProcess = pdfConverter(infilePath, outfilePath);
  handleConversionProcess(conversionProcess, res);
  temp.cleanup();
}

router.post('/', handlePostRequest)

function handleConversionProcess(conversionProcess, httpResponse) {
  conversionProcess.on('error', function(err) {
    httpResponse.json(err)
  });

  conversionProcess.on('finished', function(fileContents) {
    httpResponse.write(fileContents);
    httpResponse.end()
  });
}

module.exports = router;
