const {
  address, lorem, random, internet,
} = require('faker');

const path = require('path');
const fs = require('fs');

const { coords, images } = require('../fakeData.js');

const createAttraction = (index) => {
  const attraction = {
    attraction_id: index,
    attraction_name: lorem.words(),
    latitude: Math.random() * (coords.north - coords.south) + coords.south,
    longitude: Math.random() * (coords.east - coords.west) + coords.west,
    rating: Number((Math.random(5 - 3) + 1).toFixed(1)),
    review_count: Math.floor(Math.random() * (3000 - 1) + 1),
    attraction_url: internet.url(),
    image_path: images[random.number(images.length - 1)],
    image_alt: lorem.words(),
  };
  return attraction;
};

const generateAttractions = (max) => {
  const attractions = [];
  for (let i = 1; i <= max; i += 1) {
    attractions.push(createAttraction(i));
  }
  return attractions;
};

const attractions = generateAttractions(100);

const createTour = (id) => (
  {
    _id: id,
    tour_name: `Tour around ${address.city()}`,
    overview: lorem.paragraph(),
    cancellation_policy: lorem.paragraph(),
    return_details: lorem.paragraph(),
    startpoint_name: lorem.words(),
    startpoint_street: address.streetAddress(),
    startpoint_city: address.city(),
    startpoint_state: address.stateAbbr(),
    startpoint_zip: address.zipCode('#####'),
    startpoint_country: 'USA',
    startpoint_details: lorem.sentences(),
    endpoint_name: lorem.words(),
    endpoint_street: address.streetAddress(),
    endpoint_city: address.city(),
    endpoint_state: address.stateAbbr(),
    endpoint_zip: address.zipCode(),
    endpoint_country: 'USA',
    endpoint_details: lorem.sentences(),
  }
);

const createStop = (id, positionValue) => (
  {
    stop_id: id,
    position: positionValue,
    duration: random.number({ min: 15, max: 180 }),
    admission_details: `Admission ${positionValue % 2 ? 'included' : 'excluded'}`,
    stop_description: lorem.paragraph(),
  }
);


const generateData = async (max) => {
  let stopCount = 1;
  let attractionIndex = 0;
  console.time('Write time');
  const tourWriter = fs.createWriteStream((path.join(__dirname, 'mongo_fakeData', 'mongo_tours.json')));

  for (let i = 1; i <= max; i += 1) {
    const tourId = i;
    const tour = createTour(tourId);

    const stopsPerTour = random.number({ min: 1, max: 2 });
    const stopsArray = [];
    for (let j = 1; j <= stopsPerTour; j += 1) {
      const stop = createStop(stopCount, j);
      stop.attraction = attractions[attractionIndex];
      attractionIndex = attractionIndex === 99 ? 0 : attractionIndex += 1;

      stopsArray.push(stop);
      tour.stops = stopsArray;
      stopCount += 1;
    }
    if (!tourWriter.write(JSON.stringify(tour))) {
      await new Promise((resolve) => tourWriter.once('drain', resolve));
    }
  }
  tourWriter.end();
  console.log(`Finished writing ${max} tours and ${stopCount} stops`);
  console.timeEnd('Write time');
};

generateData(1000000);

module.exports = {
  createStop,
  createTour,
};
