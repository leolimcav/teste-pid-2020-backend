"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class SessionController {
  async create(req, res) {
    const { rg_cpf } = req.body;

    const user = await _User2.default.findOne({ $or: [{ rg: rg_cpf }, { cpf: rg_cpf }] });

    if (!user) {
      return res.status(401).json({ error: "User doesn't exist!" });
    }

    await user.populate('photo').execPopulate();

    return res.json(user);
  }
}

exports. default = new SessionController();
