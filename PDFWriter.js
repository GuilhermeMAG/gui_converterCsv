var puppeteer = require('puppeteer');

class PDFWriter {

  static async WritePDF(filename, html) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, {waitUntil: 'domcontentloaded'});

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    try { // Downlaod the PDF
      const pdf = await page.pdf({
        path: `${filename}.pdf`,
        margin: {
          top: '100px',
          right: '50px',
          bottom: '100px',
          left: '50px'
        },
        printBackground: true,
        format: 'A4'
      });
    } catch (error) {
      console.log('Erro ao gerar pdf: \n\ Failed to generate PDF' + error);
    }
    // Close the browser instance
  await browser.close();
  }
}
module.exports = PDFWriter;
