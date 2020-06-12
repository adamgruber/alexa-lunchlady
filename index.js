const Alexa = require('ask-sdk');
const LaunchRequest = require('./lib/handlers/LaunchRequest');
const Unhandled = require('./lib/handlers/Unhandled');
const GetMenuIntent = require('./lib/handlers/GetMenuIntent');
const SessionEndedRequest = require('./lib/handlers/SessionEndedRequest');
const PersistenceSavingResponseInterceptor = require('./lib/handlers/PersistenceSavingResponseInterceptor');

// Load environment variables
require('dotenv').config();

let skill;

const env = process.env.NODE_ENV || 'development';

/**
 * Main lambda function for handling Alexa requests
 *
 * @param {object} event Alexa request object
 * @param {object} context Optional context
 *
 * @return {Promise<ASKResponse>}
 */
exports.handler = async (event, context) => {
  if (!skill) {
    skill = Alexa.SkillBuilders.standard()
      .addRequestHandlers(GetMenuIntent, LaunchRequest, SessionEndedRequest)
      .addResponseInterceptors(PersistenceSavingResponseInterceptor)
      .addErrorHandlers(Unhandled)
      .withSkillId(process.env.ALEXA_APP_ID)
      .withTableName('MyTestTable') // process.env.DYNAMODB_TABLE)
      .withAutoCreateTable(true)
      .withDynamoDbClient(env === 'development' && require('./localDynamoDb')) // eslint-disable-line
      .create();
  }
  return skill.invoke(event, context);
};
