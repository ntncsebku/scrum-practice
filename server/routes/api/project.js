const express = require('express');

const User = require('../../models/User');
const Project = require('../../models/Project');

const verifyToken = require('../../middlewares/verifyToken');

const router = express.Router();
const authRouter = express.Router();

/**
 * Routes require user loged in and request with token
 * req: { username, userId }
 * prefix: 'm/'
 */
authRouter.use(verifyToken);
router.use('/m', authRouter);


// Get all projects of an user
router.get('/user/:username', (req, res) => {
  const { username } = req.params;
  User.findOne({ username }, '-password').populate('projects').then((user) => {
    if (!user) res.status(404).send({ msg: 'User not found' });
    res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ msg: err.message });
  });
});

// Get all my projects
authRouter.get('/all', (req, res) => {
  const { username, userId } = req;
  User.findById(userId, '-password').populate('projects').then((user) => {
    if (!user) res.status(404).send({ msg: 'User not found' });
    res.status(200).send(user);
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ msg: err.message });
  });
});

// Get project data
router.get('/:projectId', (req, res) => {
  const { projectId } = req.params;
  Project.findById(projectId, (err, project) => {
    if (err) {
      console.log(err);
      res.status(50).send({ msg: err.message });
    }
    if (!project) res.status(404).send({ msg: 'Project not found' });
    res.status(200).json(project);
  });
});

// New project
authRouter.post('/create', (req, res) => {
  const { name } = req.body;
  const { username, userId } = req;
  const project = new Project({
    name,
    creator: userId
  });
  project.save((err, project) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg: err.message });
    }
    res.status(200).json(project);
  });
});


module.exports = router;
