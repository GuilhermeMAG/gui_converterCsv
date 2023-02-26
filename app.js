const fs = require('fs');

var Reader = require('./js/ReaderAsyncAwait');
var Writer = require('./js/Writer');
var Processor = require('./js/Processor');
var Table = require('./js/Table');
var HtmlParser = require('./js/HtmlParser');
var PDFWriter = require('./js/PDFWriter');

var reader = new Reader();
var writer = new Writer();

async function main() {

  var data = await reader.Read('./examples/users.csv');

  var processedData = Processor.Process(data);

  var users = new Table(processedData);

  var html = await HtmlParser.Parse(users);



  writer.Write(Date.now() + ".html", html);

  PDFWriter.WritePDF(`${Date.now()}PDF`, html);

}

main();