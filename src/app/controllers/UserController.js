import * as Yup from 'yup';

import User from '../models/User';
import UserFile from '../models/UserFile';

class UserController {
  async show(req, res) {
    const { rg_cpf } = req.params;

    const user = await User.findOne({
      $or: [{ rg: rg_cpf }, { cpf: rg_cpf }],
    });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' });
    }

    const photos = await UserFile.find({ user_id: user._id })
      .populate('user_id')
      .populate('photo_id')
      .exec();

    return res.json(photos);
  }

  async index(req, res) {
    const { name } = req.query;

    if (name) {
      const user = await User.findOne({
        name: { $regex: `${name}.*`, $options: '-i' },
      })
        .populate('photo')
        .exec();

      return res.json(user);
    }

    const users = await User.find()
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

    const userExists = await User.findOne({
      $or: [{ rg }, { cpf }],
    });

    if (userExists) {
      return res.status(400).json({ error: 'User Already Exists!' });
    }

    const user = await User.create({
      name,
      cpf,
      rg,
      birth_date,
      mother_name,
      father_name,
      photo,
    });

    UserFile.create({
      photo_id: photo,
      user_id: user._id,
    });

    await user.populate('photo').execPopulate();

    return res.json(user);
  }

  async update(req, res) {
    const { photo } = req.body;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { photo });

    UserFile.create({
      photo_id: photo,
      user_id: id,
    });

    await user.populate('photo').execPopulate();

    return res.json(user);
  }

  async delete(req, res) {
    const { rg_cpf } = req.params;

    const user = await User.findOneAndDelete({
      $or: [{ rg: rg_cpf }, { cpf: rg_cpf }],
    });

    const photos = await UserFile.find({ user_id: user._id });

    photos.forEach(async photo => {
      await photo.remove();
    });

    return res.json(user);
  }
}

export default new UserController();
