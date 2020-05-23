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
    tour_name: 'alksfjlkd',
    overview: 'sadklfjasdkljflakds',
    cancellation_policy: 'asdjflksadjfkl',
    return_details: 'dlkajfkldjsafklajds',
    startpoint_name: 'flkajsdlfkj',
    startpoint_street: 'alksdjklasdjfkldddsd',
    startpoint_city: 'alksdjklasdjfkldddsd',
    startpoint_state: 'alksdjklasdjfkldddsd',
    startpoint_zip: 94117,
    startpoint_details: 'alksdjklasdjfkldddsd',
    endpoint_name: 'alksdjklasdjfkldddsd',
    endpoint_street: 'alksdjklasdjfkldddsd',
    endpoint_city: 'alksdjklasdjfkldddsd',
    endpoint_state: 'alksdjklasdjfkldddsd',
    endpoint_zip: 94117,
    endpoint_details: 'asdlkfjsadklfjdslkafjkd',

  },
];

const tourFileName = 'tours.csv';

module.exports = {
  tourHeaders,
  tours,
  tourFileName,
};
