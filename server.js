'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const errors = require('http-errors');

const searchVideo = require('./searchVideo');

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/apm', (req, res, next) => {
  const text = req.body.text;
  if (!text) {
    return next(new errors.BadRequest('Missing or invalid text parameter'));
  }

  const query = 'apm ' + text;

  searchVideo(query)
    .then((videoUrl) => {
      res.json({
        response_type: 'in_channel',
        text: videoUrl
      });
    })
    .catch(next);
});

app.use((error, req, res, next) => {
  let status;
  let message;
  if (error.response) {
    status = error.response.status;
    message = error.response.statusText;
  } else {
    status = error.status || 500;
    message = error.message;
  }

  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
