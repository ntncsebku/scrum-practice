const express = require("express");
const router = express.Router();

router.use('/auth', require('./auth.router'));
router.use("/project", require("./project.route"));
router.use("/user", require("./user.api"));

module.exports = router;
