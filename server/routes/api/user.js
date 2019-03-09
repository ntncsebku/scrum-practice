const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const verifyToken = require('../../middlewares/verifyToken');

const router = express.Router();

router.get('/all', (req, res) => {
  User.find().then(users => res.status(200).send(users));
});


router.get('/me', verifyToken, (req, res, next) => {
  const { username } = req;
  User.findOne({ username }, '-password').then((user) => {
    res.status(200).send(user);
  }).catch((err) => {
    next(err);
  });
});

router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username }, '-password')
    .then(user => res.status(200).send(user))
    .catch(err => console.log(err));
});


module.exports = router;
