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
  await timeout(1000);
  await frame.click('#link_User_3_1');
  await timeout(1000);
  const contentFrame = page.frames().find(frame => frame.name() === 'contentfrm');
  const element = await contentFrame.$('[name="btnReboot"]');
  await element.click();
  // const response = await page.waitForNavigation({waitUntil:'networkidle2'});

  // await page.evaluate(() => clickLogout());

  // await page.waitForSelector('#sethelp');


  await browser.close();
  process.exit(1);
});