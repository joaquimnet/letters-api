require('tinv')();
const path = require('path');
const express = require('express');
const ponaserv = require('ponaserv');
const morgan = require('morgan');
const cors = require('cors');
const consola = require('consola');
const mongoose = require('mongoose');

const { PORT, MONGODB_URI } = require('./config');

const app = express();

app.use(morgan('common'));
app.use(cors());

ponaserv(app, {
  services: path.join(__dirname, 'services'),
  // debug: true,
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    consola.info('DB okay...');
    app.listen(PORT, () => {
      consola.info(`Listening on port ${PORT}`);
    });
  })
  .catch(() => {
    consola.fatal('DB not okay...');
  });

// you have no reason to let the in between stop you
