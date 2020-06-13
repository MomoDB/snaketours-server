const mongoose = require('mongoose');

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect('mongodb://54.219.124.156/snaketours', config);

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = db;
