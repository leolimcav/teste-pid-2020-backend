import User from '../models/User';

class SessionController {
  async create(req, res) {
    const { rg_cpf } = req.body;

    const user = await User.findOne({ $or: [{ rg: rg_cpf }, { cpf: rg_cpf }] });

    if (!user) {
      return res.status(401).json({ error: "User doesn't exist!" });
    }

    await user.populate('photo').execPopulate();

    return res.json(user);
  }
}

export default new SessionController();
