'use strict';

const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const compact = require('lodash.compact');

const menuUrl = 'http://3838a.cbsd.org/SchoolLunch2/?menu=EL_Lunch';

module.change_code = 1;

const _getSpokenResponse = (dateSlot, menus) => {
  // Sorry, I didn't find a menu for {Date}.
  // The menu for {Date} is {menu}.
  // There is no school today.
  // There is no school tomorrow.
  // There is no school on {Date}.

  const dateSlotFormatted = moment(dateSlot, 'YYYY-MM-DD').format('dddd, MMMM Do');
  const today = moment().format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'd').format('YYYY-MM-DD');
  const requestedMenu = menus[dateSlot];
  const noSchool = requestedMenu && (requestedMenu[0] === 'No School');

  let day = noSchool ? `on ${dateSlotFormatted}` : dateSlotFormatted;

  // dateSlot is today
  if (dateSlot === today) {
    day = 'today';
  }

  // dateSlot is tomorrow
  if (dateSlot === tomorrow) {
    day = 'tomorrow';
  }

  if (!requestedMenu || !requestedMenu.length) {
    return `Sorry, I didn't find a menu for ${day}.`;
  }

  return noSchool
    ? `There is no school ${day}.`
    : `The menu for ${day} is, ${requestedMenu.join('. ')}.`;
};

const _constructMenus = dom => {
  const menus = {};
  const $ = cheerio.load(dom);

  // Look for dates, get the lunch items and add them to the menu
  $('.Date').each((i, el) => {
    const $el = $(el);
    const date = moment($el.text(), 'dddd, MMM D, YYYY');
    if (date.isValid()) {
      const dateStr = date.format('YYYY-MM-DD');
      console.log(`dateStr: ${dateStr}`);
      const menuItems = $el.nextAll('[id^=plnLunch]').first().find('li span')
        .map((j, elem) => $(elem).text().trim())
        .toArray();
      menus[dateStr] = compact(menuItems);
    }
  });

  return menus;
};

const getMenuIntentHandler = function (req, response) {
  // See if the request has a DATE and default to today if not
  const dateSlot = req.slot('Date') || moment().format('YYYY-MM-DD');
  console.log(`dateSlot: ${dateSlot}`);

  // Get the menu
  request.get(menuUrl, (err, res) => {
    if (res && res.body) {
      const menus = _constructMenus(res.body);
      console.log(menus);
      const spokenResonse = _getSpokenResponse(dateSlot, menus);
      response.say(spokenResonse);
      // this is async and will run after the http call returns
      response.send();
    }
  });
  // return false immediately so alexa-app doesn't send the response
  return false;
};

module.exports = getMenuIntentHandler;
