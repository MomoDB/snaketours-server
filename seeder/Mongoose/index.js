const { MongoClient } = require('mongodb');
const assert = require('assert');
const { random } = require('faker');
const { createStop, createTour } = require('./mongo_dataGenerator.js');

const url = 'mongodb://localhost:27017';

const dbName = 'snaketours';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  console.time('Write time');
  createDocuments(1000000, db);
  console.timeEnd('Write time');
  // insertDocuments(db, 1000000, () => client.close());
});

const insertDocuments = (db, documents) => {
  // Get the tours collection
  const collection = db.collection('tours');
  // Insert documents
  collection.insertMany(documents, (err, result) => {
    assert.equal(err, null);
    assert.equal(documents.length, result.result.n);
    assert.equal(documents.length, result.ops.length);
    console.log(`Inserted ${documents.length} documents into the collection`);
  });
};

const createDocuments = async (max, db) => {
  let documents = [];
  for (let i = 1; i <= max; i += 1) {
    const tour = createTour();
    const stopsPerTour = random.number({ min: 1, max: 8 });
    for (let j = 1; j <= stopsPerTour; j += 1) {
      const stop = createStop(j);
      tour.stops.push(stop);
    }
    documents.push(tour);
    if (documents.length === 100000) {
      await insertDocuments(db, documents);
      documents = [];
    }
  }
};


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/snaketours', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const { Schema } = mongoose;

// const TourSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   tour_name: String,
//   overview: String,
//   cancellation_policy: String,
//   return_details: String,
//   startpoint_name: String,
//   startpoint_street: String,
//   startpoint_city: String,
//   startpoint_state: String,
//   startpoint_zip: Number,
//   startpoint_country: String,
//   startpoint_details: String,
//   endpoint_name: String,
//   endpoint_street: String,
//   endpoint_city: String,
//   endpoint_state: String,
//   endpoint_zip: Number,
//   endpoint_country: String,
//   endpoint_details: String,
//   stops: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Stop',
//     },
//   ],
// });

// const StopSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   position: Number,
//   duration: Number,
//   admission_details: String,
//   description: String,
//   attraction_name: String,
//   latitude: Schema.Types.Decimal128,
//   longitude: Schema.Types.Decimal128,
//   attraction_rating: Schema.Types.Decimal128,
//   url: String,
//   image_path: String,
//   image_alt: String,
// });
