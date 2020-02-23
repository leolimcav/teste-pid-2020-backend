import User from '../models/User';

class SessionController {
  async create(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User doesn't exist!" });
    }

    return res.json(user);
  }
}

export default new SessionController();
