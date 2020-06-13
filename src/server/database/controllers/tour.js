const Tour = require('../models/tour.js');
const db = require('../index.js');
const { redisClient } = require('../../redis.js');

const getTour = (id, callback) => {
  Tour.findById(id, (err, tour) => {
    if (err) {
      callback(err);
    }
    redisClient.setex(id, 3600, JSON.stringify(tour));
    callback(null, tour);
  });
};

const addTour = (data, callback) => {
  Tour.create(data, (err, tour) => {
    if (err) {
      callback(err);
    }
    callback(null, tour);
  });
};

module.exports = {
  getTour,
  addTour,
};
