const express = require('express');
const routes = require('routes.js');
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

var Reader = require('./js/ReaderAsyncAwait');
var Writer = require('./js/Writer');
var Processor = require('./js/Processor');
var Table = require('./js/Table');
var HtmlParser = require('./js/HtmlParser');
var PDFWriter = require('./js/PDFWriter');

var reader = new Reader();
var writer = new Writer();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function main(option, file) {

  var data = await reader.Read('./examples/users.csv');

  var processedData = Processor.Process(data);

  var users = new Table(processedData);

  var html = await HtmlParser.Parse(users);



  writer.Write(Date.now() + ".html", html);

  PDFWriter.WritePDF(`${Date.now()}PDF`, html);

}

main();