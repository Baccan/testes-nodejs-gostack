import User from '../models/User';

class UserController {
  async store(req, res) {
    // if (req.body.email === 'gustavobaccango@gmail.com') {
    //   return res.status(400).json({ error: 'E-mail ruim' });
    // }

    const { email } = req.body;

    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(400).json({ error: 'Duplicated email' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
