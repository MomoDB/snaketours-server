const faker = require('faker');

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


const createTours = async () => {
  console.time('Write time');
  const writer = csvWriter({ headers: tourHeaders });
  writer.pipe(fs.createWriteStream('tours.csv'));

  for (let i = 1; i <= 10000000; i += 1) {
    const tour = {
      tour_id: i,
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
    if (!writer.write(tour)) {
      await new Promise(resolve => writer.once('drain', resolve));
    }
  }
  writer.end();
  console.timeEnd('Write time');
};

createTours();





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