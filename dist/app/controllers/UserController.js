"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _UserFile = require('../models/UserFile'); var _UserFile2 = _interopRequireDefault(_UserFile);

class UserController {
  async show(req, res) {
    const { rg_cpf } = req.params;

    const user = await _User2.default.findOne({
      $or: [{ rg: rg_cpf }, { cpf: rg_cpf }],
    });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' });
    }

    const photos = await _UserFile2.default.find({ user_id: user._id })
      .populate('user_id')
      .populate('photo_id')
      .exec();

    return res.json(photos);
  }

  async index(req, res) {
    const { name } = req.query;

    if (name) {
      const user = await _User2.default.findOne({
        name: { $regex: `${name}.*`, $options: '-i' },
      })
        .populate('photo')
        .exec();

      return res.json(user);
    }

    const users = await _User2.default.find()
      .populate('photo')
      .exec();

    return res.json(users);
  }

  async create(req, res) {
    const {
      name,
      cpf,
      rg,
      birth_date,
      mother_name,
      father_name,
      photo,
    } = req.body;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string()
        .required()
        .min(11),
      rg: Yup.string()
        .required()
        .min(11),
      birth_date: Yup.date().required(),
      mother_name: Yup.string().required(),
      father_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail!' });
    }

    const userExists = await _User2.default.findOne({
      $or: [{ rg }, { cpf }],
    });

    if (userExists) {
      return res.status(400).json({ error: 'User Already Exists!' });
    }

    const user = await _User2.default.create({
      name,
      cpf,
      rg,
      birth_date,
      mother_name,
      father_name,
      photo,
    });

    _UserFile2.default.create({
      photo_id: photo,
      user_id: user._id,
    });

    await user.populate('photo').execPopulate();

    return res.json(user);
  }

  async update(req, res) {
    const { photo } = req.body;
    const { id } = req.params;

    const user = await _User2.default.findByIdAndUpdate(id, { photo });

    _UserFile2.default.create({
      photo_id: photo,
      user_id: id,
    });

    await user.populate('photo').execPopulate();

    return res.json(user);
  }

  async delete(req, res) {
    const { rg_cpf } = req.params;

    const user = await _User2.default.findOneAndDelete({
      $or: [{ rg: rg_cpf }, { cpf: rg_cpf }],
    });

    const photos = await _UserFile2.default.find({ user_id: user._id });

    photos.forEach(async photo => {
      await photo.remove();
    });

    return res.json(user);
  }
}

exports. default = new UserController();
