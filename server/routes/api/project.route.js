const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Project = require("../../models/Project");

// List all projects
router.get("/projects/:username", (req, res) => {
  const username = req.params;
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log(err);
    }
    const result = [];
    user.projects.forEach(projectId => {
      Project.findOne({ _id: projectId }, (err, project) => {
        if (err) {
          console.log(err);
        }
        result.concat([{ id: projectId, name: project.name }]);
      });
    });
  });
  res.status(200).json({ data: result });
});

// Get project data
router.get("/:id", (req, res) => {
  const projectId = req.params;
  Project.findById(projectId, (err, project) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ data: project });
  });
});

// New project
router.post("/add", (req, res) => {
  console.log(req.body);
  const { name, cols } = req.body;
  let JsonCols = JSON.parse(cols);
  console.log(JsonCols);
  const newProject = new Project({
    name: name,
    cols: JsonCols
  });
  newProject.save((err, saved) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ data: saved });
  });
});

module.exports = router;
