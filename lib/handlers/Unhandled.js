const UnhandledRequestHandler = {
  canHandle() {
    return true;
  },

  handle(handlerInput, error) {
    console.log(handlerInput.requestEnvelope);
    console.log(error);

    const speechText = "Sorry, I'm having trouble getting the menu right now.";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Lunch Lady', speechText)
      .getResponse();
  },
};

module.exports = UnhandledRequestHandler;
