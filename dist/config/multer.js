"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _path = require('path');
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

exports. default = _multer2.default.call(void 0, {
  storage: _multer2.default.diskStorage({
    destination: _path.resolve.call(void 0, __dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      _crypto2.default.randomBytes(16, (err, res) => {
        if (err) return err;

        return cb(err, res.toString('hex') + _path.extname.call(void 0, file.originalname));
      });
    },
  }),
});
