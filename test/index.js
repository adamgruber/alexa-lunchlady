const { handler } = require('../index');
const launchRequest = require('./launchRequest.json');
const getMenuIntent = require('./getMenuIntent.json');

handler(getMenuIntent, {
  succeed: res => {
    console.log(res);
  },
});
