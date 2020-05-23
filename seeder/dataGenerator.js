const faker = require('faker');
const { address, lorem } = faker;

const tourFileName = 'tours.csv';

const tourHeaders = [
  { id: 'tour_name', title: 'tour_name' },
  { id: 'overview', title: 'overview' },
  { id: 'cancellation_policy', title: 'cancellation_policy' },
  { id: 'return_details', title: 'return_details' },
  { id: 'startpoint_name', title: 'startpoint_name' },
  { id: 'startpoint_street', title: 'startpoint_street' },
  { id: 'startpoint_city', title: 'startpoint_city' },
  { id: 'startpoint_state', title: 'startpoint_state' },
  { id: 'startpoint_zip', title: 'startpoint_zip' },
  { id: 'startpoint_details', title: 'startpoint_details' },
  { id: 'endpoint_name', title: 'endpoint_name' },
  { id: 'endpoint_street', title: 'endpoint_street' },
  { id: 'endpoint_city', title: 'endpoint_city' },
  { id: 'endpoint_state', title: 'endpoint_state' },
  { id: 'endpoint_zip', title: 'endpoint_zip' },
  { id: 'endpoint_details', title: 'endpoint_details' },
];

const tours = [
  {
    tour_name: `Tour around ${address.city()}`,
    overview: lorem.paragraph(),
    cancellation_policy: lorem.paragraph(),
    return_details: lorem.paragraph(),
    startpoint_name: lorem.words(),
    startpoint_street: address.streetAddress(),
    startpoint_city: address.city(),
    startpoint_state: address.stateAbbr(),
    startpoint_zip: address.zipCode(),
    startpoint_details: lorem.sentences(),
    endpoint_name: lorem.words(),
    endpoint_street: address.streetAddress(),
    endpoint_city: address.city(),
    endpoint_state: address.stateAbbr(),
    endpoint_zip: address.zipCode(),
    endpoint_details: lorem.sentences(),
  },
];

// const createTours = () => {
//   for (let i = 0; i < 100; i += 1) {
//     const tour = {
//       tour_name: `Tour around ${address.city}`,
//       overview: 'sadklfjasdkljflakds',
//       cancellation_policy: 'asdjflksadjfkl',
//       return_details: 'dlkajfkldjsafklajds',
//       startpoint_name: 'flkajsdlfkj',
//       startpoint_street: 'alksdjklasdjfkldddsd',
//       startpoint_city: 'alksdjklasdjfkldddsd',
//       startpoint_state: 'alksdjklasdjfkldddsd',
//       startpoint_zip: 94117,
//       startpoint_details: 'alksdjklasdjfkldddsd',
//       endpoint_name: 'alksdjklasdjfkldddsd',
//       endpoint_street: 'alksdjklasdjfkldddsd',
//       endpoint_city: 'alksdjklasdjfkldddsd',
//       endpoint_state: 'alksdjklasdjfkldddsd',
//       endpoint_zip: 94117,
//       endpoint_details: 'asdlkfjsadklfjdslkafjkd',

//     },
//   };

// };


module.exports = {
  tourHeaders,
  tours,
  tourFileName,
};
