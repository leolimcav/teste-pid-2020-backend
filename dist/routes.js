"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);

var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.get('/', (req, res) => {
  res.json({ msg: 'API ITS WORKING' });
});

routes.post('/sessions', _SessionController2.default.create);

routes.get('/users', _UserController2.default.index);
routes.get('/users/:rg_cpf', _UserController2.default.show);
routes.post('/users', _UserController2.default.create);
routes.put('/users/:id', _UserController2.default.update);
routes.delete('/users/:id', _UserController2.default.delete);

routes.post('/files', upload.single('profile'), _FileController2.default.create);

exports. default = routes;
