module.exports = function unhandledRequest() {
  this.emit(':tell', "Sorry, I'm having trouble getting the menu right now.");
};
