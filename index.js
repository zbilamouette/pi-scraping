const puppeteer = require('puppeteer');

const PI_AMOUNT = 1111;

const perform = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/115.0.0.0 Safari/537.36');

    await page.goto('https://crypto.com/price/pinetwork', { waitUntil: 'networkidle2' });

    const headings = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.chakra-heading'))
        .map(el => el.textContent.trim());
    });

    // a la zob
    const priceText = headings.find(text => /^\$\d+(\.\d+)?\s*USD$/.test(text));
    console.log("Texte du prix trouvé :", priceText);

    if (!priceText) {
        await browser.close();
        return;
    }

    const value = parseFloat(
        priceText.replace(/[^0-9.,]/g, '').replace(',', '.')
    );

    if (isNaN(value)) {
        console.log("Erreur : valeur non valide extraite");
    } else {
        const totalWorth = value * PI_AMOUNT;
        const netWorth = totalWorth * 0.7;
        const taxDues = totalWorth * 0.3;

        console.log("PI VALUE =", value);
        console.log("Total worth =", totalWorth);
        console.log("Net worth =", netWorth);
        console.log("Tax dues =", taxDues);
    }

    await browser.close();
};

console.log("EXECUTION");
setInterval(perform,5000);
