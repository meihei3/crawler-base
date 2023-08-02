const helper = require('../helper');

/**
 * @param {puppeteer.page} page
 */
exports.do = async (page) => {
  await page.goto(`http://example.com`, { waitUntil: 'domcontentloaded' });
  await helper.delay(1000);
};
