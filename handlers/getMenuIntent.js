const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

const menuUrl = 'http://3838a.cbsd.org/SchoolLunch2/?menu=EL_Lunch';

module.change_code = 1;

const getMenuIntentHandler = function (req, response) {
  // See if the request has a DATE and default to today if not
  const dateSlot = req.slot('DATE', moment().format('YYYY-MM-DD'));
  console.log(dateSlot);

  // Get the menu
  request.get(menuUrl, function(err, res) {
    if (res && res.body) {
      const menus = {};
      console.log(dateSlot);
      const $ = cheerio.load(res.body);

      // Look for dates, get the lunch items and add them to the menu
      $('.Date').each(function (i, el) {
        const $el = $(el);
        const dateStr = moment($el.text(), 'dddd, MMM D, YYYY').format('YYYY-MM-DD');
        const menuItems = $el.nextAll('[id^=plnLunch]').first().find('li span')
          .map((i, el) => $(el).text().trim())
          .toArray();
        menus[dateStr] = menuItems;
      });

      console.log(menus);

      // See if the dateSlot matches an entry on the menu
      if (menus[dateSlot] && menus[dateSlot].length) {
        menus[dateSlot].forEach(menuItem => response.say(menuItem));
      } else {
        response.say('Sorry, I\'m having trouble getting the menu.');
      }

      // this is async and will run after the http call returns
      response.send();
    }
  });
  // return false immediately so alexa-app doesn't send the response
  return false;
};

module.exports = getMenuIntentHandler;

