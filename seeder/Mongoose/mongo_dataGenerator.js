const { address, lorem, random, internet } = require('faker');
const path = require('path');
const csvWriter = require('csv-write-stream');
const fs = require('fs');

const { coords, images } = require('../../src/server/database/fakeData.js');

const tourHeaders = [
  'tour_name',
  'overview',
  'cancellation_policy',
  'return_details',
  'startpoint_name',
  'startpoint_street',
  'startpoint_city',
  'startpoint_state',
  'startpoint_zip',
  'startpoint_country',
  'startpoint_details',
  'endpoint_name',
  'endpoint_street',
  'endpoint_city',
  'endpoint_state',
  'endpoint_zip',
  'endpoint_country',
  'endpoint_details',
];

const createTour = () => {
  const tour = {
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
    stops: [],
  };
  return tour;
};

const createStop = (positionValue) => {
  const stop = {
    position: positionValue,
    duration: random.number({ min: 15, max: 180 }),
    admission_details: `Admission ${positionValue % 2 ? 'included' : 'excluded'}`,
    stop_description: lorem.paragraph(),
    attraction_name: lorem.words(),
    latitude: Math.random() * (coords.north - coords.south) + coords.south,
    longitude: Math.random() * (coords.east - coords.west) + coords.west,
    rating: (Math.random(5 - 3) + 1).toFixed(1),
    review_count: Math.floor(Math.random() * (3000 - 1) + 1),
    attraction_url: internet.url(),
    image_path: images[random.number(images.length - 1)],
    image_alt: lorem.words(),
  };
  return stop;
};

const createData = async (max) => {
  console.time('Write time');
  const writer = csvWriter({ headers: tourHeaders });
  writer.pipe(fs.createWriteStream(path.join(__dirname, 'mongo_fakeData', 'mongo_tours.csv')));

  for (let i = 1; i <= max; i += 1) {
    const tour = createTour();
    const stopsPerTour = random.number({ min: 1, max: 8 });
    for (let j = 1; j <= stopsPerTour; j += 1) {
      const stop = createStop(j);
      tour.stops.push(stop);
    }
    console.log(tour);
    if (!writer.write(tour)) {
      await new Promise((resolve) => writer.once('drain', resolve));
    }
  }
  writer.end();
  console.timeEnd('Write time');
};

createData(1);
