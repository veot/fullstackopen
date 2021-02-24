const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
  );
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
