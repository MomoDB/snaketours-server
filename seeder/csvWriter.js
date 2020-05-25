const { createObjectCsvWriter } = require('csv-writer');
const { tourHeaders, tours, tourFileName } = require('./dataGenerator');

const csvWriter = createObjectCsvWriter({
  path: `./seeder/${tourFileName}`,
  header: tourHeaders,
});

console.time('Write time');
csvWriter
  .writeRecords(tours)
  .then(() => {
    console.log('The CSV File was written successfully');
    console.timeEnd('Write time');
  });
