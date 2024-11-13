const puppeteer = require('puppeteer');

const PI_AMOUNT = 1567;
const INTERVAL_DELAY = 2000;

const perform = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.htx.com/fr-fr/trade/pi_usdt', {
        waitUntil: 'networkidle2'
    });

    await page.waitForSelector('.el-popover__reference');

    const data = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('.el-popover__reference'));
        return elements.map(el => el.textContent.trim());
    });

    const value = parseFloat(data[0])

    const totalWorth = value*PI_AMOUNT;
    const netWorth = totalWorth*0.7;
    const taxDues = totalWorth*0.3;

    console.log("\n\nPI VALUE =",value);
    console.log("\ntotal worth =",totalWorth);
    console.log("  net worth =",netWorth);
    console.log("   tax dues =",taxDues);


    await browser.close();
}

console.log("EXECUTION");
setInterval(perform,INTERVAL_DELAY);


