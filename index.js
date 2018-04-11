const Alexa = require('alexa-sdk');
const handlers = require('./lib/handlers');

const APP_ID = 'amzn1.ask.skill.5fd2362f-ed50-4c00-a703-aa4958691058';

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
