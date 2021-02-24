const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash,
  });
  const savedUser = await user.save();
  res.json(savedUser);
});

router.get('/', async (req, res) => res.json(await User.find({})));

module.exports = router;
