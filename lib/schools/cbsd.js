const axios = require('axios');
const cheerio = require('cheerio');
const compact = require('lodash.compact');
const format = require('date-fns/format');

const meta = {
  name: 'Central Bucks',
  state: 'PA',
  county: 'Bucks',
  schools: {
    elementary: [
      'Barclay',
      'Bridge Valley',
      'Buckingham',
      'Butler',
      'Cold Spring',
      'Doyle',
      'Gayman',
      'Groveland',
      'Jamison',
      'Kutz',
      'Linden',
      'Mill Creek',
      'Pine Run',
      'Titus',
      'Warwick',
    ],
    middle: ['Lenape', 'Tamanend', 'Unami', 'Holicong', 'Tohickon'],
    high: ['East', 'South', 'West'],
  },
};

function getUrlForSchool(school) {
  const urls = {
    ELEMENTARY: 'http://3838a.cbsd.org/SchoolLunch2/?menu=EL_Lunch',
    MIDDLE: 'http://3838a.cbsd.org/SchoolLunch2/?menu=EL_Lunch',
    HIGH: 'http://3838a.cbsd.org/SchoolLunch2/?menu=EL_Lunch',
  };
  return urls.ELEMENTARY;
}

function constructMenus(dom) {
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
}

module.exports = async function getMenu(school, dateSlot, menuType) {
  const menuUrl = getUrlForSchool(school);

  // Scrape the website and create the menus object
  const { data } = await axios.get(menuUrl);
  const menus = constructMenus(data);

  const requestedMenu = menus[dateSlot];
  const isSchoolClosed = requestedMenu && requestedMenu[0] === 'No School';

  return new Promise(resolve => {
    // Return a standard GetMenuResponse
    resolve({
      isSchoolClosed,
      menuText: requestedMenu ? requestedMenu.join('. ') : undefined,
    });
  });
};
