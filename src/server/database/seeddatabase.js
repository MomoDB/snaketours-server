const _ = require('underscore');
const faker = require('faker');
const fs = require('fs');
const path = require('path');

const {
  cancellationPolicies,
  returnDetails,
  lead,
  conveyance,
  tourTitleChunk,
  localeName,
  coords,
  images,
} = require('./fakeData.js');

module.exports = function (models) {
  function pickrand(array) {
    const max = array.length - 1;
    const i = _.random(0, max);
    return array[i];
  }

  function makeTitle() {
    const myLead = pickrand(lead);
    const myConveyance = pickrand(conveyance);
    const myTitlechunk = pickrand(tourTitleChunk);
    const myLocale = pickrand(localeName);
    const title = `${myLead} ${myConveyance} ${myTitlechunk} ${myLocale}`;
    return title;
  }

  // Make a batch of tours:
  const tours = [];
  for (let i = 0; i < 100; i += 1) {
    const tour = {
      name: makeTitle(),
      overview: faker.lorem.sentences(),
      cancellation_policy: pickrand(cancellationPolicies),
      return_details: pickrand(returnDetails),
    };
    tours.push(tour);
  }

  // Make a batch of attractions:
  const attractions = [];
  for (let i = 0; i < 500; i += 1) {
    const attraction = {
      name: faker.lorem.words(),
      latitude: Math.random() * (coords.north - coords.south) + coords.south,
      longitude: Math.random() * (coords.east - coords.west) + coords.west,
      description: faker.lorem.sentences(),
      rating: (Math.random(5 - 3) + 1).toFixed(1),
      image_path: pickrand(images),
      image_alt: faker.lorem.words(),
    };
    attractions.push(attraction);
  }

  // Stick that into the database
  models.Attraction.bulkCreate(attractions,
    {
      updateOnDuplicate: ['name'],
    })
    .then(() => {
      models.Tour.bulkCreate(tours, {
        updateOnDuplicate: ['name'],
      });
    })
    .then(() => {
      for (let i = 0; i < 500; i += 1) {
        // A given tour is going to have an ID between 1 and 100
        const tour_id = _.random(1, 100);
        // a given attraction will have an ID between 1 and 500
        const attraction_id = i;
        models.Attraction.findOne({
          where: { id: attraction_id },
        })
          .then((attraction) => {
            models.Tour.findOne({
              where: {
                id: tour_id,
              },
            })
              .then((tour) => {
                tour.addAttraction(attraction);
              })
              .catch((error) => {
                console.error(error);
              });
          });
      }
    });
};
