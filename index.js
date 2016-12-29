'use strict';

const alexa = require('alexa-app');
const getMenuSchema = require('./schemas/getMenu');
const getMenuIntentHandler = require('./handlers/getMenuIntent');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
const app = new alexa.app('lunchlady');

app.launch((req, res) => {
  res.say('Hello, I\'m the lunch lady. You can ask me what\'s for lunch and I will tell you the menu.');
});

app.intent('GetMenuIntent', getMenuSchema, getMenuIntentHandler);

app.error = (exception, request, response) => {
  response.say('Sorry, I\'m having trouble getting the lunch menu.');
};

module.exports = app;

exports.handler = app.lambda();
