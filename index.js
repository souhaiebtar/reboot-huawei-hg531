const puppeteer = require('puppeteer');

function pageClick(page,selector) {
  page.evaluate( s => document.querySelector(s).click(),selector);
}

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

puppeteer.launch({headless: true}).then(async browser => {
  const page = await browser.newPage();
  page.on("dialog", async dialog => {
    console.log("the dialog message is", dialog.message());
    console.log("the dialog type is", dialog.type());
    await dialog.accept();
    });
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('http://192.168.1.1',{waitUntil: 'networkidle0'});

    await page.focus('#txt_Username');
    await page.keyboard.type('user');

    await page.focus('#txt_Password');
    await page.keyboard.type('user1234');


  await page.click('#btnLogin');

  await timeout(2000);
  const frame = page.frames().find(frame => frame.name() === 'menufrm');
  await frame.click('#link_User_3');
  await timeout(1000);
  await frame.click('#link_User_3_1');
  await timeout(1000);
  const contentFrame = page.frames().find(frame => frame.name() === 'contentfrm');
  const element = await contentFrame.$('[name="btnReboot"]');
  await element.click();


  await browser.close();
  process.exit(1);
});