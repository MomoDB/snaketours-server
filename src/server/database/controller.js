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

module.exports.createTour = function (data, callback) {
  // TODO: Implement sequelize query for POST
};

module.exports.createAttraction = function (data, callback) {
  // TODO: Implement sequelize query for POST
};

module.exports.addAttractionToTour = function (tourId, attractionId, callback) {
  // TODO: Implement sequelize query for POST
};

module.exports.deleteTour = function (id, callback) {
  // TODO: Implement sequelize query for DELETE
};

module.exports.deleteAttraction = function (id, callback) {
  // TODO: Implement sequelize query for DELETE
};

module.exports.deleteAttractionFromTour = function (tourId, attractionId, callback) {
  // TODO: Implement sequelize query for DELETE
};

module.exports.updateTour = function (id, callback) {
  // TODO: Implement sequelize query for PUT
};

module.exports.updateAttraction = function (id, callback) {
  // TODO: Implement sequelize query for PUT
};


// Note: Add/delete atraction to/from tour, which will involve updating the join table. When adding, associate attraction id with tour id. When deleting, remove association.
