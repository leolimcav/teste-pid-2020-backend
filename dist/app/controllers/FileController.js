"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class FileController {
  async create(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await _File2.default.create({ name, path });
    const { url } = file;

    return res.json({ file, url });
  }
}

exports. default = new FileController();
