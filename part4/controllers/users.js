const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  if (req.body.password === undefined || req.body.password.length < 3) {
    return res
      .status(400)
      .send({ error: 'Minimum allowed password lenghth is 3.' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

router.get('/', async (req, res) => res.json(await User.find({})));

module.exports = router;
