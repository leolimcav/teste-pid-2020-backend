"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class SessionController {
  async create(req, res) {
    const { email } = req.body;

    const user = await _User2.default.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User doesn't exist!" });
    }

    return res.json(user);
  }
}

exports. default = new SessionController();
