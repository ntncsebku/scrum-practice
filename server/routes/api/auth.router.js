const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   User.findByUsername(username, function(err, user) {
//     if (err) return res.status(500).send({ message: err, data: req.body });

//     if (!user)
//       return res
//         .status(404)
//         .send({ message: "User not found", data: { username, password } });

//     if (user.password !== password)
//       return res
//         .status(409)
//         .send({ message: "Incorrect password.", data: { username, password } });

//     const token = jwt.sign({ data: username }, config.get("jwtSecret"), {
//       expiresIn: "24h"
//     });
//     res.status(200).send({ message: "Login user successfully", data: token });
//   });
// });

// router.get("/logout", (req, res) => {
//   res.status(200).send({ message: "You are logged out", data: null });
// });
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username: username,
    password: password,
    projects: []
  });
  newUser.save((err, saved) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: saved });
  });
});

module.exports = router;
