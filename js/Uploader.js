const multer = require('multer');
const util = require('util');

class Uploader{
  constructor() {
    this.uploader = util.promisify(multer.diskStorage);
  }

  async Upload() {
    try {
      return await this.uploader();
    } catch (error) {
      return undefined;
    }
  }
}
module.exports = Uploader;