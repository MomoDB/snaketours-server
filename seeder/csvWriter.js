const { createObjectCsvWriter } = require('csv-writer');
const { tourHeaders, tours, tourFileName } = require('./dataGenerator');

const csvWriter = createObjectCsvWriter({
  path: `./seeder/${tourFileName}`,
  header: tourHeaders,
});

csvWriter
  .writeRecords(tours)
  .then(() => console.log('The CSV File for was written successfully'));
