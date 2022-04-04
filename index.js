const express = require('express');
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
  .connect(mongoURL)
  .then(() => console.log('successfully connected to DB'))
  .catch((e) => {
    console.log(e)
    setTimeout(connectWithRetry, 5000)
  });
}

connectWithRetry();

app.get('/', (req, res) => {
  res.send('<h2>Hi, I am Testing Api!pp</h2>')
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));