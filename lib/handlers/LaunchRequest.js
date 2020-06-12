const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },

  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    console.log(requestAttributes);
    console.log(sessionAttributes);

    const speechText =
      "Hello, I'm the lunch lady. You can ask me what's for breakfast or lunch and I will tell you the menu.";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Lunch Lady', speechText)
      .getResponse();
  },
};

module.exports = LaunchRequestHandler;
