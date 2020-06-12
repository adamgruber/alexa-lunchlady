const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://3838a.cbsd.org/SchoolLunch2/?menu=EL_Lunch');

  // Get the "viewport" of the page, as reported by the page.
  const content = await page.content();
  // console.log(content);

  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('#ButtonNext'),
  ]);

  const nextContent = await response.text();

  console.log(nextContent);


  await browser.close();
})();
