"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const FileSchema = new _mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

FileSchema.virtual('url').get(function() {
  return `${process.env.APP_URL}/files/${this.path}`;
});
exports. default = _mongoose2.default.model('File', FileSchema);
