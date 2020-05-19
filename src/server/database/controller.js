const sequelize = require('sequelize');
const models = require('./models');

const { Tour } = models;
// this is const Tour = models.Tour but it's defined using destructuring
// https://exploringjs.com/impatient-js/ch_destructuring.html#object-destructuring

module.exports.getTour = function (id, callback) {
  console.log(`Tour for ...${id}`);
  Tour.findOne({
    where: {
      id,
    },
    include: [
      {
        model: models.Attraction,
      },
    ],
  })
    .then((tour) => {
      callback(null, tour);
    })
    .catch((error) => {
      callback(error, null);
    });
};

module.exports.getRandomTour = function (callback) {
  Tour.findOne({
    order: sequelize.fn('random'),
    include: [
      {
        model: models.Attraction,
      },
    ],
  })
    .then((tour) => {
      callback(null, tour);
    })
    .catch((error) => {
      callback(error, null);
    });
};
