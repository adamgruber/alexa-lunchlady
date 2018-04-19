const states = require('./states');

module.exports = function newSessionRequest() {
  console.log('NewSession');
  // Check if a user has set a school
  const schoolIsSet =
    Object.keys(this.attributes).length && this.attributes.school;

  this.handler.state = schoolIsSet ? states.MENU : states.CHOOSE;
  this.emitWithState(schoolIsSet ? 'GetMenuIntent' : 'SetSchoolIntent');
};

// "Hello, I'm the lunch lady. You can ask me what's for breakfast or lunch and I will tell you the menu."
