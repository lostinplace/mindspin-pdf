var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path'),
	child_process = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'PDF Converter'
	});
});

function handlePostRequest(req, res, next) {
	var pdfFile = req.files.pdf,
		outPath = pdfFile.path + '.out',
		conversionArgs = [
			pdfFile.path,
			outPath
		];

	var conversionProcess = child_process.spawn('pdftotext', conversionArgs);
	conversionProcess.on('error', function(err) {
		res.json(err)
	});

	conversionProcess.on('exit', function() {
		var outFileContents = fs.readFileSync(outPath, 'utf8'),
			response = {
				text: outFileContents
			}
		res.write(outFileContents);
	});
}

router.post('/', handlePostRequest)

module.exports = router;
