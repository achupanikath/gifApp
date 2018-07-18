const mongoose = require('mongoose');

const setupMongooseConnections = function() {
  mongoose.Promise = global.Promise;

  // mongoose.set('debug', true);

  mongoose.connect('mongodb://localhost:27017/gifgo');

}

module.exports = setupMongooseConnections;
