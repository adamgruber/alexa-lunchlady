const axios = require('axios');
const cheerio = require('cheerio');
const compact = require('lodash.compact');

const format = require('date-fns/format');
const isToday = require('date-fns/is_today');
const isTomorrow = require('date-fns/is_tomorrow');

const menuUrl = 'http://3838a.cbsd.org/SchoolLunch2/?menu=EL_Lunch';

const getSpokenResponse = (dateSlot, menus) => {
  // Sorry, I didn't find a menu for {Date}.
  // The menu for {Date} is {menu}.
  // There is no school today.
  // There is no school tomorrow.
  // There is no school on {Date}.

  const dateSlotFormatted = format(dateSlot, 'dddd, MMMM Do');
  const requestedMenu = menus[dateSlot];
  const noSchool = requestedMenu && requestedMenu[0] === 'No School';

  let day = noSchool ? `on ${dateSlotFormatted}` : dateSlotFormatted;

  // dateSlot is today
  if (isToday(dateSlot)) {
    day = 'today';
  }

  // dateSlot is tomorrow
  if (isTomorrow(dateSlot)) {
    day = 'tomorrow';
  }

  if (!requestedMenu || !requestedMenu.length) {
    return `Sorry, I didn't find a menu for ${day}.`;
  }

  return noSchool
    ? `There is no school ${day}.`
    : `The menu for ${day} is, ${requestedMenu.join('. ')}.`;
};

const constructMenus = dom => {
  const menus = {};
  const $ = cheerio.load(dom);

  // Look for dates, get the lunch items and add them to the menu
  $('.Date').each((i, el) => {
    const $el = $(el);
    const dateText = $el.text();
    if (dateText) {
      const dateStr = format(dateText, 'YYYY-MM-DD');
      console.log(`dateStr: ${dateStr}`);
      const menuItems = $el
        .nextAll('[id^=plnLunch]')
        .first()
        .find('li span')
        .map((j, elem) =>
          $(elem)
            .text()
            .trim()
            .replace(/&/g, 'and')
        )
        .toArray();
      menus[dateStr] = compact(menuItems);
    }
  });

  return menus;
};

module.exports = async function getMenuIntent() {
  const { intent } = this.event.request;
  const { slots } = intent;

  // See if the request has a DATE and default to today if not
  const dateSlot = slots.Date.value || format(new Date(), 'YYYY-MM-DD');
  console.log(`dateSlot: ${dateSlot}`);

  // Get the menu
  try {
    const { data } = await axios.get(menuUrl);
    console.log(data);
    const menus = constructMenus(data);
    console.log(menus);
    const spokenResonse = getSpokenResponse(dateSlot, menus);
    this.response.speak(spokenResonse);
    this.emit(':responseReady');
  } catch (err) {
    console.log(err);
  }
};
