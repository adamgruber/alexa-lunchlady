/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');

const { handler } = require('./lib');

const server = express();
server.use(bodyParser.json());

// Create POST route
server.post('/', (req, res) => {
  // Create dummy context with fail and succeed functions
  const context = {
    fail: () => res.sendStatus(500),
    succeed: data => res.send(data),
  };

  // Initialize alexa sdk
  handler(req.body, context);
});

// Start express server
server.listen(3000, () => {
  console.log('Local alexa skill listening on port 3000!');
});
