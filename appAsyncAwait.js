var Reader = require('./ReaderAsyncAwait');
var Writer = require('./Writer');
var Processor = require('./Processor');
var Table = require('./Table');
var HtmlParser = require('./HtmlParser');
var PDFWriter = require('./PDFWriter');

var leitor = new Reader();
var escritor = new Writer();

async function main() {
  var dados = await leitor.Read('./users.csv');
  var dadosProcessados = Processor.Process(dados);

  var usuarios = new Table(dadosProcessados);

  // console.log(usuarios.rows);

  var html = await HtmlParser.Parse(usuarios);

  // console.log(HtmlProcessado);

  escritor.Write(Date.now() + ".html", html);

  PDFWriter.WritePDF(`${Date.now()}meuPDF`, html);

  // usuarios.rows.push(["Gui","Docker","docker",4]);

  // console.log(usuarios.header);
  // console.log(usuarios.rows);

  // // campos virtuais
  // console.log(usuarios.RowCount);
  // console.log(usuarios.ColumnCount);
}

main();