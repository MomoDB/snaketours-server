const express = require('express');
const path = require('path');
const ctlr = require('./database/controller');

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/image/', express.static(path.join(__dirname, '..', 'public', 'img')));

app.get('/tour/:id', (req, res) => {
  // This route will look up a tour by ID and send the relevant data.

  const { params: { id } } = req;
  // this is const id = req.params.id but it's defined using destructuring
  // https://exploringjs.com/impatient-js/ch_destructuring.html#object-destructuring
  ctlr.getTour(id, (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end();
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify(data));
  });
});

app.get('/tour/', (req, res) => {
  console.log("Tour route was hit.");
  // This route will look up a tour by ID and send the relevant data.
  ctlr.getRandomTour((err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end();
      return;
    }
    res.writeHead(200);
    res.end(JSON.stringify(data));
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.post('/tour/', (req, res) => {
  //TODO: Call controller function for posting tour
});

app.post('/attraction/', (req, res) => {
  //TODO: Call controller function for posting attraction
});

app.post('/tour/:tourId/attraction/:attractionId', (req, res) => {
  //TODO: Call controller function for posting posting attraction to tour association
});

app.delete('/tour/:id', (req, res) => {
  //TODO: Call controller function for deleting tour
});

app.delete('/attraction/:id', (req, res) => {
  //TODO: Call controller function for deleting attraction
});

app.post('/tour/:tourId/attraction/:attractionId', (req, res) => {
  //TODO: Call controller function for posting posting attraction to tour association
});

app.put('/tour/:id', (req, res) => {
  //TODO: Call controller function for updating tour
});

app.put('/attraction/:id', (req, res) => {
  //TODO: Call controller function for updating attraction
});


module.exports = app;
