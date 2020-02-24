"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const UserFileSchema = new _mongoose2.default.Schema(
  {
    photo_id: {
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: 'File',
    },
    user_id: {
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
exports. default = _mongoose2.default.model('UserFile', UserFileSchema);
