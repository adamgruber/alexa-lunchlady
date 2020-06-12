const debug = require('debug')('lunchlady');

const format = require('date-fns/format');
const isToday = require('date-fns/is_today');
const isTomorrow = require('date-fns/is_tomorrow');

const getMenu = require('../schools/cbsd');

function getResponseText(dateSlot, menuType, { isSchoolClosed, menuText }) {
  // Sorry, I didn't find a menu for {Date}.
  // The menu for {Date} is {menu}.
  // There is no school today.
  // There is no school tomorrow.
  // There is no school on {Date}.

  const dateSlotFormatted = format(dateSlot, 'dddd, MMMM Do');

  let day = isSchoolClosed ? `on ${dateSlotFormatted}` : dateSlotFormatted;

  // dateSlot is today
  if (isToday(dateSlot)) {
    day = 'today';
  }

  // dateSlot is tomorrow
  if (isTomorrow(dateSlot)) {
    day = 'tomorrow';
  }

  if (!menuText) {
    return `Sorry, I didn't find a ${menuType} menu for ${day}.`;
  }

  return isSchoolClosed
    ? `There is no school ${day}.`
    : `The ${menuType} menu for ${day} is, ${menuText}.`;
}

const GetMenuIntentHandler = {
  canHandle({ requestEnvelope }) {
    const {
      request: { type, intent },
    } = requestEnvelope;
    return type === 'IntentRequest' && intent.name === 'GetMenuIntent';
  },

  handle({ requestEnvelope, attributesManager, responseBuilder }) {
    const {
      request: { intent },
    } = requestEnvelope;
    console.log('\nREQUEST================');
    console.log(requestEnvelope.request);
    const requestAttributes = attributesManager.getRequestAttributes();
    const sessionAttributes = attributesManager.getSessionAttributes();

    console.log('\nREQUEST ATTRIBUTES================');
    console.log(requestAttributes);

    console.log('\nSESSION ATTRIBUTES================');
    console.log(sessionAttributes);

    console.log('\nINTENT================');
    console.log(intent);

    // See if the request has a DATE and default to today if not
    const dateSlot =
      intent.slots.date.value || format(new Date(), 'YYYY-MM-DD');
    debug(`dateSlot: ${dateSlot}`);

    const school = 'cbsd';
    const menuType = 'lunch';

    return new Promise((resolve, reject) => {
      getMenu(school, dateSlot, menuType)
        .then(getMenuResponse => {
          debug(getMenuResponse);
          const speechText = getResponseText(
            dateSlot,
            menuType,
            getMenuResponse
          );
          const response = responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Lunch Lady', speechText)
            .getResponse();
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};

module.exports = GetMenuIntentHandler;
