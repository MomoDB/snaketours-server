const faker = require('faker');
const path = require('path');

const { address, lorem } = faker;

const csvWriter = require('csv-write-stream');
const fs = require('fs');


const tourHeaders = [
  'tour_id',
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

const images = [
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/1024px-Hibernia_Bank%2C_San_Francisco.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/13159501074_c13ff7cc0d_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/2018-09-Salesforce-eschipul-0884-afb96.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/2018-09-Salesforce-eschipul-0915-e9941.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/32711819568_4755604d06_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/4083220012_0bbdfbd151_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/40956932812_bf1735edf3_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/4844340604_a287f7fed7_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/640px-Chinatown_San_Francisco_(26720090647).jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/640px-San_Francisco_Womens_Building.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/BalcluthaRainbow-copy.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/CCSF_Ocean_Avenue_Campus.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/Eureka_688px.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/bal_bow_ggb_415px.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/images+(1).jpeg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/images+(2).jpeg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/images.jpeg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/pd51b5-021-jj-a.webp',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/red-and-white-fleet-san-francisco-93197a-1024.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-2107524_960_720.webp',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-3608352_960_720.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-golden-gate-bridge-united-states-travel.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-public-transportation10.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/transamerica-pyramid-san-francisco-902f5a-1024.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/union-square-san-francisco-482942-1024.jpg',
];

const coords = {
  north: 37.788915,
  east: -122.390197,
  south: 37.722464,
  west: -122.503719,
};

const attractionHeaders = [
  'attraction_id',
  'attraction_name',
  'latitude',
  'longitude',
  'rating',
  'review_count',
  'attraction_url',
  'image_path',
  'image_alt',
];


const stopHeaders = [
  'stop_id',
  'tour_id',
  'attraction_id',
  'position',
  'duration',
  'admission_details',
  'stop_description',
];

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
    attraction_url: faker.internet.url(),
    image_path: images[faker.random.number(images.length - 1)],
    image_alt: lorem.words(),
  };
  return attraction;
};

const createStops = async (tourCount, headers, fileName) => {
  console.time('Write time');
  const writer = csvWriter({ headers });
  writer.pipe(fs.createWriteStream(path.join(__dirname, fileName)));
  let totalStops = 0;
  for (let i = 1; i <= tourCount; i += 1) {
    const stopsPerTour = faker.random.number({ min: 1, max: 8 });
    let stopCount = 1;
    const randomAttractionId = faker.random.number(10000000 - stopsPerTour);
    while (stopCount <= stopsPerTour) {
      totalStops += 1;
      const stop = {
        stop_id: totalStops,
        tour_id: i,
        attraction_id: randomAttractionId + stopCount,
        position: stopCount,
        duration: faker.random.number({ min: 15, max: 180 }),
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
  console.timeEnd('Write time');
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
