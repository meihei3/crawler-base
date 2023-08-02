const puppeteer = require('puppeteer');

/**
 * @param {puppeteer.page} page
 */
const deleteCookies = async (page) => {
  const client = await page.target().createCDPSession()
  await client.send('Network.clearBrowserCookies')
}

(async () => {
  // headless: true でヘッドレスモードで起動する
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage({ width: 2440, height: 900 });

  await page.goto(`http://example.com`, {waitUntil: "domcontentloaded"});
  await deleteCookies(page);

  // end
  await browser.close();
  console.log('\nall completed');
})();
