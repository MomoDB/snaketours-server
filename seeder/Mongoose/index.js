const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/snaketours', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

const TourSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  overview: String,
  cancellation_policy: String,
  return_details: String,
  startpoint_name: String,
  startpoint_street: String,
  startpoint_city: String,
  startpoint_state: String,
  startpoint_zip: Number,
  startpoint_details: String,
  endpoint_name: String,
  endpoint_street: String,
  endpoint_city: String,
  endpoint_state: String,
  endpoint_zip: Number,
  endpoint_details: String,
  stops: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Stop',
    },
  ],
});

const StopSchema = new Schema({
  _id: Schema.Types.ObjectId,
  position: Number,
  duration: Number,
  admission_details: String,
  description: String,
  attraction_name: String,
  latitude: Schema.Types.Decimal128,
  longitude: Schema.Types.Decimal128,
  attraction_rating: Schema.Types.Decimal128,
  url: String,
  image_path: String,
  image_alt: String,
});
