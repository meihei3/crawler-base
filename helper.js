/**
 * @param {number} ms
 */
exports.delay = require('util').promisify(setTimeout);

/**
 * @param {puppeteer.page} page
 */
exports.deleteCookies = async (page) => {
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
};
