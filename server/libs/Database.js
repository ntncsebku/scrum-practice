const mongoose = require('mongoose');

module.exports = function () {
  mongoose.set('useCreateIndex', true);
  return mongoose.connect('mongodb://scrum:scrum123@ds157735.mlab.com:57735/scrum-practice', { useNewUrlParser: true });
};
