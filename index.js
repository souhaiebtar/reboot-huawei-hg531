const puppeteer = require('puppeteer');

function pageClick(page,selector) {
  page.evaluate( s => document.querySelector(s).click(),selector);
}

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

puppeteer.launch({headless: false}).then(async browser => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('http://192.168.1.1',{waitUntil: 'networkidle0'});

    await page.focus('#txt_Username');
    await page.keyboard.type('topadmin');

    await page.focus('#txt_Password');
    await page.keyboard.type('topadmin');
  
    // const loginInput=await page.$('#txt_Username');
    // loginInput.value='topadmin';
    // const passwordInput=await page.$('#txt_Password');
    // passwordInput.value='topadmin';


  await page.click('#btnLogin');
  // pageClick(page, '#btnLogin');

  await timeout(2000);
  // open help work
  // const frame = page.frames().find(frame => frame.name() === 'logofrm');
  // await frame.evaluate(() => {
  //   clickHelp();
  // });
  const frame = page.frames().find(frame => frame.name() === 'menufrm');
  await frame.click('#link_User_3');
  await timeout(2000);
  await frame.click('#link_User_3_1');
  await timeout(3000);
  const contentFrame = page.frames().find(frame => frame.name() === 'contentfrm');
  const element = await contentFrame.$('[name="btnReboot"]');
  await element.click();
  // const response = await page.waitForNavigation({waitUntil:'networkidle2'});

  // await page.evaluate(() => clickLogout());

  // await page.waitForSelector('#sethelp');


  await timeout(4000);
  await page.screenshot({ path: 'myscreenshot.png', fullPage: true });

  await timeout(13000);
  await browser.close();
});