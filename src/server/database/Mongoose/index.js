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
  attractions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Attraction',
    },
  ],
});

const AttractionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  latitude: Schema.Types.Decimal128,
  longitude: Schema.Types.Decimal128,
  description: String,
  rating: Schema.Types.Decimal128,
  url: String,
  image_path: String,
  image_alt: String,
  tours: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
  ],
});
