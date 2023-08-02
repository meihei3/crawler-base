const delay = require('util').promisify(setTimeout);

/**
 * @param {puppeteer.page} page
 */
exports.do = async (page) => {
  await page.goto(`http://example.com`, {waitUntil: "domcontentloaded"});
  await delay(1000);
}
