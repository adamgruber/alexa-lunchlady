const Alexa = require('alexa-sdk');
const {
  handlers,
  chooseModeHandlers,
  menuModeHandlers,
} = require('./handlers');

// Load environment variables
require('dotenv').config();

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = process.env.ALEXA_APP_ID;
  alexa.dynamoDBTableName = process.env.DYNAMODB_TABLE;
  alexa.registerHandlers(handlers, chooseModeHandlers, menuModeHandlers);
  alexa.execute();
};
