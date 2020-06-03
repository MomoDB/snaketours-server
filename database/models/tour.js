const mongoose = require('mongoose');

const attractionSchema = mongoose.Schema({
  attraction_id: Number,
  attraction_name: String,
  latitude: Number,
  longitude: Number,
  rating: Number,
  review_count: Number,
  attraction_url: String,
  image_path: String,
  image_alt: String,
});

const stopSchema = mongoose.Schema({
  stop_id: Number,
  position: Number,
  duration: Number,
  admission_details: String,
  stop_description: String,
  attraction: attractionSchema,
});

const tourSchema = mongoose.Schema({
  _id: Number,
  tour_name: String,
  overview: String,
  cancellation_policy: String,
  return_details: String,
  startpoint_name: String,
  startpoint_street: String,
  startpoint_city: String,
  startpoint_state: String,
  startpoint_zip: String,
  startpoint_country: String,
  startpoint_details: String,
  endpoint_name: String,
  endpoint_street: String,
  endpoint_city: String,
  endpoint_state: String,
  endpoint_zip: String,
  endpoint_country: String,
  endpoint_details: String,
  stops: [stopSchema],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
