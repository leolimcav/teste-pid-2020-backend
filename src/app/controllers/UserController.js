import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async show(req, res) {
    const { rg_cpf } = req.params;
    const user = await User.findOne({
      $or: [{ rg: rg_cpf }, { cpf: rg_cpf }],
    })
      .populate('photo')
      .exec();
    return res.json(user);
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

    await user.populate('photo').execPopulate();

    return res.json(user);
  }

  async update(req, res) {
    const { photo } = req.body;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { photo });

    await user.populate('photo').execPopulate();

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    return res.json(user);
  }
}

export default new UserController();
