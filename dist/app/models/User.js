"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const UserSchema = new _mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    rg: {
      type: String,
      required: true,
      unique: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    mother_name: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    photo: {
      type: _mongoose2.default.Schema.Types.ObjectId,
      ref: 'File',
    },
  },
  { timestamps: true }
);

exports. default = _mongoose2.default.model('Users', UserSchema);
