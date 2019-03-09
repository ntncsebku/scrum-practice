const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const config = require('../../config');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || username == '') throw new Error('Username is not provided');
    if (!password || password == '') throw new Error('Password is not provided');
  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }

  let user = await User.findOne({ username });
  if (user) return res.status(400).send({ msg: 'Username has been used' });

  user = new User({ username, password });
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: err.message });
    }
    res.status(200).json({ msg: 'Register successfully', user });
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || username == '') throw new Error('Username is not provided');

    if (!password || password == '') throw new Error('Password is not provided');

  } catch (err) {
    return res.status(422).send({ msg: err.message });
  }

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send({ msg: 'User not found' });
  if (user.password !== password) {
    return res.status(400).send({ msg: 'Password is not correct' });
  }

  user.password = undefined;

  const token = jwt.sign(
    { data: { username, userId: user._id.toString() } },
    config.secretKey,
    (err, token) => {
      res.status(200).send({
        token,
        user
      });
    }
  );
});

module.exports = router;
