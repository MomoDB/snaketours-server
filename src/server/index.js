const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const { getTour, addTour } = require('../../database/controllers/tour.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/image/', express.static(path.join(__dirname, '..', 'public', 'img')));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request for ${req.path}`);
  next();
});

app.get('/tour/:id', (req, res) => {
  getTour(req.params.id, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.status(200).send(data);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.post('/tour/', (req, res) => {
  addTour(req.body, (err, data) => {
    if (err) {
      console.error(err);
      res.status(501).send(err);
    }
    res.status(201).send(data);
  });
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
