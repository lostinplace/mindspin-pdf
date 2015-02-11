var nodeUtil = require("util"),
	fs = require('fs'),
	_ = require('underscore'),
	PDFParser = require("pdf2json/pdfparser");

var pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataReady", function() {
	debugger;
});

pdfParser.on("pdfParser_dataError", function() {
	debugger;
});

var pdfFilePath = './10726-Atria-GreenRidge-Place-calendar.pdf';

pdfParser.loadPDF(pdfFilePath);

// or call directly with buffer
fs.readFile(pdfFilePath, function(err, pdfBuffer) {
	debugger
	if (!err) {
		var output = pdfParser.parseBuffer(pdfBuffer);
		console.log("output is:" + output);
	}
})
