const { address, lorem, internet, random } = require('faker');
const path = require('path');
const csvWriter = require('csv-write-stream');
const fs = require('fs');

const { images, coords } = require('../src/server/database/fakeData.js');
const { tourHeaders, stopHeaders, attractionHeaders } = require('./Postgres/pg_headers.js');

const createTour = (index) => {
  const tour = {
    tour_id: index,
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
  };
  return tour;
};

const createAttraction = (index) => {
  const attraction = {
    attraction_id: index,
    attraction_name: lorem.words(),
    latitude: Math.random() * (coords.north - coords.south) + coords.south,
    longitude: Math.random() * (coords.east - coords.west) + coords.west,
    rating: (Math.random(5 - 3) + 1).toFixed(1),
    review_count: Math.floor(Math.random() * (3000 - 1) + 1),
    attraction_url: internet.url(),
    image_path: images[random.number(images.length - 1)],
    image_alt: lorem.words(),
  };
  return attraction;
};

const createStops = async (tourCount, headers, fileName) => {
  console.time('Write time for stops');
  const writer = csvWriter({ headers });
  writer.pipe(fs.createWriteStream(path.join(__dirname, fileName)));
  let totalStops = 0;
  for (let i = 1; i <= tourCount; i += 1) {
    const stopsPerTour = random.number({ min: 1, max: 8 });
    let stopCount = 1;
    const randomAttractionId = random.number(10000000 - stopsPerTour);
    while (stopCount <= stopsPerTour) {
      totalStops += 1;
      const stop = {
        stop_id: totalStops,
        tour_id: i,
        attraction_id: randomAttractionId + stopCount,
        position: stopCount,
        duration: random.number({ min: 15, max: 180 }),
        admission_details: `Admission ${totalStops % 2 ? 'included' : 'excluded'}`,
        stop_description: lorem.paragraph(),
      };
      if (!writer.write(stop)) {
        await new Promise((resolve) => writer.once('drain', resolve));
      }
      stopCount += 1;
    }
  }
  writer.end();
  console.log(`${totalStops} stops created for ${tourCount} tours`);
  console.timeEnd('Write time for stops');
};

const createData = async (constructor, headers, max, fileName) => {
  console.time('Write time');
  const writer = csvWriter({ headers });
  writer.pipe(fs.createWriteStream(path.join(__dirname, fileName)));

  for (let i = 1; i <= max; i += 1) {
    const obj = constructor(i);

    if (!writer.write(obj)) {
      await new Promise((resolve) => writer.once('drain', resolve));
    }
  }
  writer.end();
  console.timeEnd('Write time');
};

createData(createTour, tourHeaders, 10000000, 'tours.csv');
createData(createAttraction, attractionHeaders, 10000000, 'attractions.csv');
createStops(10000000, stopHeaders, 'stops.csv');
