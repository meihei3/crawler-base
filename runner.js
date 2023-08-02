const puppeteer = require('puppeteer');
const cliProgress = require('cli-progress');
const fs = require('fs');
const path = require('path');

/**
 * @param {puppeteer.page} page
 */
const deleteCookies = async (page) => {
  const client = await page.target().createCDPSession()
  await client.send('Network.clearBrowserCookies')
}

(async () => {
  const files = fs.readdirSync('./tasks/');
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(files.length, 0);

  // headless: true でヘッドレスモードで起動する
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage({ width: 2440, height: 900 });

  for (let file of files) {
    if (!path.basename(file, '.js')) continue;
    const task = require(`./tasks/${file}`);
    await task.do(page);
    progressBar.increment();
  }

  // end
  progressBar.stop();
  await browser.close();
  console.log('\nall completed');
})();
