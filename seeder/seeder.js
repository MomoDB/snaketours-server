const { createObjectCsvWriter } = require('csv-writer');

const csvWriter = createObjectCsvWriter({
  path: './seeder/out.csv',
  header: [
    { id: 'name', title: 'Name' },
    { id: 'surname', title: 'Surname' },
    { id: 'age', title: 'Age' },
    { id: 'gender', title: 'Gender' },
  ],
});

const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M',
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F',
  },
];

csvWriter
  .writeRecords(data)
  .then(() => console.log('The CSV File was written successfully'));
