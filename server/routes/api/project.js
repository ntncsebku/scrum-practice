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
  User.findOne({ username }, '-password')
    .populate('projects')
    .then((user) => {
      if (!user) res.status(404).send({ msg: 'User not found' });
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err.message });
    });
});

// Get all my projects
authRouter.get('/all', (req, res) => {
  const { username, userId } = req;
  User.findById(userId, '-password')
    .populate('projects')
    .then((user) => {
      if (!user) res.status(404).send({ msg: 'User not found' });
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err.message });
    });
});

// Get project data
router.get('/:projectId', (req, res) => {
  const { projectId } = req.params;
  Project.findById(projectId).populate('members').populate('creator').then((project) => {
    if (!project) res.status(404).send({ msg: 'Project not found' });
    res.status(200).json(project);
  })
    .catch((err) => {
      console.log(err);
      res.status(50).send({ msg: err.message });
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
    User.findByIdAndUpdate(userId, {
      $addToSet: {
        projects: project._id
      }
    })
      .then(() => {
        res.status(200).json(project);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ msg: err.message });
      });
  });
});

// add member to project
authRouter.post('/:projectId/invite', async (req, res) => {
  const { projectId } = req.params;
  const { membername } = req.body;
  const { username, userId } = req;

  let memberId = 0;
  await User.find({ username: membername })
    .then((user) => { memberId = user[0]._id; })
    .catch(err => console.log(err));

  Project.findById(projectId)
    .then((project) => {
      if (!project) return res.status(404).send({ msg: 'Project not found' });
      const members = project.members;
      if (userId != project.creator && !members.find(u => u == userId)) {
        return res
          .status(400)
          .send({ msg: 'You dont have permission for this project' });
      }
      return Project.findByIdAndUpdate(projectId, {
        $addToSet: {
          members: memberId
        }
      })
        .then(project => User.findByIdAndUpdate(memberId, {
          $addToSet: {
            projects: projectId
          }
        }))
        .then(() => {
          res.status(200).send({ msg: 'Invite successfully' });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err.message });
    });
});

// add column to a project
authRouter.post('/:projectId/col/add', (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;
  const { username, userId } = req;
  Project.findById(projectId)
    .then((project) => {
      if (!project) return res.status(404).send({ msg: 'Project not found' });
      const members = project.members;
      if (userId != project.creator && !members.find(u => u == userId)) {
        return res
          .status(400)
          .send({ msg: 'You dont have permission for this project' });
      }
      project.cols.push({ name });
      return project.save().then((project) => {
        res.status(200).send(project);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err.message });
    });
});

// add item to a column in a project
authRouter.post('/:projectId/col/:colId/item/add', (req, res) => {
  const { projectId, colId } = req.params;
  const { title, note, start, due } = req.body;
  const { username, userId } = req;
  Project.findById(projectId)
    .then((project) => {
      if (!project) return res.status(404).send({ msg: 'Project not found' });
      const members = project.members;
      if (userId != project.creator && !members.find(u => u == userId)) {
        return res
          .status(400)
          .send({ msg: 'You dont have permission for this project' });
      }
      const colIdx = project.cols.findIndex(u => u._id == colId);
      if (colId == -1) return res.status(400).send({ msg: 'Column is not exist' });
      project.cols[colIdx].items.push({
        title,
        note,
        start,
        due,
        author: userId
      });
      return project.save().then(() => {
        res.status(200).send({ msg: 'Add item successfully' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err.message });
    });
});

// Update comlumn
authRouter.post('/:projectId/col/:colId/modify', (req, res) => {
  const { projectId, colId } = req.params;
  const { name } = req.body;
  const { username, userId } = req;
  Project.findById(projectId)
    .then((project) => {
      if (!project) return res.status(404).send({ msg: 'Project not found' });
      if (userId != project.creator && !members.find(u => u == userId)) {
        return res
          .status(400)
          .send({ msg: 'You dont have permission for this project' });
      }
      const colIdx = project.cols.findIndex(u => u._id == colId);
      if (colId == -1) return res.status(400).send({ msg: 'Column is not exist' });
      project.cols[colIdx].name = name;
      return project.save().then(() => {
        res.status(200).send({ msg: 'Update column name succesfully' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err.message });
    });
});

// Update card in comlumn
authRouter.post('/:projectId/col/:colId/item/:itemId/modify', (req, res) => {
  const { projectId, colId, itemId } = req.params;
  const { title, note, due, assign } = req.body;
  Project.findById(projectId)
    .then((project) => {
      if (!project) return res.status(404).send({ msg: 'Project not found' });
      if (userId != project.creator && !members.find(u => u == userId)) {
        return res
          .status(400)
          .send({ msg: 'You dont have permission for this project' });
      }
      const colIdx = project.cols.findIndex(u => u._id == colId);
      if (colId == -1) return res.status(400).send({ msg: 'Column is not exist' });
      const itemIdx = project.cols.items.findIndex(u => u._id == itemId);
      if (itemIdx == -1) return res.status(400).send({ msg: 'Item is not exist.' });
      project.cols[colIdx].items[itemIdx].title = title;
      project.cols[colIdx].items[itemIdx].note = note;
      project.cols[colIdx].items[itemIdx].due = due;
      project.cols[colIdx].items[itemIdx].assign = assign;
      return project.save().then(() => {
        res.status(200).send({ msg: 'Update card successfully.' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: err.message });
    });
});

// add member
// authRouter.get("/:projectId/invite/:username", (req, res) => {
//   const { projectId, username } = req.params;
//   const { _, userId } = req;
//   Project.findById(projectId)
//     .then(project => {
//       if (!project) return res.status(404).send({ msg: "Project not found" });
//       const members = project.members;
//       if (userId != project.creator && !members.find(u => u == userId)) {
//         return res
//           .status(400)
//           .send({ msg: "You dont have permission for this project" });
//       }
//       User.find({ username: username })
//         .then(user => {
//           if (user[0]) {
//             project.members.push(user[0]._id);
//             return project
//               .save()
//               .then(project => res.status(200).send({ msg: "Invite success" }));
//           } else
//             return res
//               .status(404)
//               .send({ msg: "User not found." })
//               .end();
//         })
//         .catch(err => res.status(500).send({ msg: err.message }));
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).send({ msg: err.message });
//     });
// });

module.exports = router;
