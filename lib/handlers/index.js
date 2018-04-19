const Alexa = require('alexa-sdk');
const states = require('./states');

const Unhandled = require('./Unhandled');
const NewSession = require('./NewSession');
const GetMenuIntent = require('./GetMenuIntent');
const SetSchoolIntent = require('./SetSchoolIntent');

const handlers = {
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
  handlers,
  chooseModeHandlers,
  menuModeHandlers,
};
