const { handler } = require('../index');
const launchRequest = require('./launchRequest');
const getMenuIntent = require('./getMenuIntent.json');

handler(launchRequest, {
  succeed: res => {
    console.log(res);
  },
});
