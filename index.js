const puppeteer = require('puppeteer');

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

puppeteer.launch({headless: false}).then(async browser => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('http://192.168.1.1',{ waitUntil : ['load', 'domcontentloaded']});

    await page.focus('#txt_Username');
    await page.keyboard.type('topadmin');

    await page.focus('#txt_Password');
    await page.keyboard.type('topadmin');
  
    // const loginInput=await page.$('#txt_Username');
    // loginInput.value='topadmin';
    // const passwordInput=await page.$('#txt_Password');
    // passwordInput.value='topadmin';


  await page.click('#btnLogin');
  await timeout(2000);



  // await page.waitForSelector('#sethelp');
  // await page.click('#sethelp');

  // await timeout(7000);
  // await page.screenshot({ path: 'myscreenshot.png', fullPage: true });

  await timeout(13000);
  await browser.close();
});