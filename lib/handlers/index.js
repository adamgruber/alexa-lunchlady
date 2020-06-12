const Alexa = require('ask-sdk');
const states = require('./states');

const Unhandled = require('./Unhandled');
const NewSession = require('./NewSession');
const GetMenuIntent = require('./GetMenuIntent');
const SetSchoolIntent = require('./SetSchoolIntent');
const LaunchRequest = require('./LaunchRequest');

const handlers = {
  LaunchRequest,
  Unhandled,
  NewSession,
};

const chooseModeHandlers = Alexa.CreateStateHandler(states.CHOOSE, {
  SetSchoolIntent,
});

const menuModeHandlers = Alexa.CreateStateHandler(states.MENU, {
  GetMenuIntent,
});

module.exports = {
  LaunchRequest,
  Unhandled,
  NewSession,
  handlers,
  chooseModeHandlers,
  menuModeHandlers,
};
