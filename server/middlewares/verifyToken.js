const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  const token = req.headers.authorization || req.headers['x-access-token'];

  if (!token) return next({ status: 403, message: 'Token is not provided' });

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return next({ status: 401, message: err.message });
    } else {
      const { username, userId } = decoded.data;
      req.username = username;
      req.userId = userId;
      next();
    }
  });
};
