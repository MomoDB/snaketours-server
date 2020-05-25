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

// createData(createTour, tourHeaders, 10000000, 'tours.csv');
createData(createAttraction, attractionHeaders, 10000000, 'attractions.csv');

// const tourFileName = 'tours.csv';

// const tourHeaders = [
//   { id: 'tour_id', title: 'tour_id' },
//   { id: 'tour_name', title: 'tour_name' },
//   { id: 'overview', title: 'overview' },
//   { id: 'cancellation_policy', title: 'cancellation_policy' },
//   { id: 'return_details', title: 'return_details' },
//   { id: 'startpoint_name', title: 'startpoint_name' },
//   { id: 'startpoint_street', title: 'startpoint_street' },
//   { id: 'startpoint_city', title: 'startpoint_city' },
//   { id: 'startpoint_state', title: 'startpoint_state' },
//   { id: 'startpoint_zip', title: 'startpoint_zip' },
//   { id: 'startpoint_country', title: 'startpoint_country' },
//   { id: 'startpoint_details', title: 'startpoint_details' },
//   { id: 'endpoint_name', title: 'endpoint_name' },
//   { id: 'endpoint_street', title: 'endpoint_street' },
//   { id: 'endpoint_city', title: 'endpoint_city' },
//   { id: 'endpoint_state', title: 'endpoint_state' },
//   { id: 'endpoint_zip', title: 'endpoint_zip' },
//   { id: 'endpoint_country', title: 'endpoint_country' },
//   { id: 'endpoint_details', title: 'endpoint_details' },
// ];
