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

module.exports = {
  tourHeaders,
  attractionHeaders,
  stopHeaders,
};
