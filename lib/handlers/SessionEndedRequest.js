const debug = require('debug')('lunchlady');

const SessionEndedRequestHandler = {
  canHandle({ requestEnvelope }) {
    return requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    debug('Session Ended');
    // any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  },
};

module.exports = SessionEndedRequestHandler;
