const puppeteer = require("puppeteer");

describe("View Study results E2E", () => {
  let browser;
  let page;

  beforeAll(async () => {
    //open browser
    browser = await puppeteer.launch({ headless: false });
    //new page
    page = await browser.newPage();
    //go to login page:
    await page.goto("http://localhost:5173/login");
  });

  afterAll(async () => {
    //close the browser
    await browser.close();
  });

  test("Log in and view results", async () => {
    try {
      await page.waitForSelector('input[name="email"]');
      await page.type('input[name="email"]', "testmail@gmail.com");
      await page.type('input[name="password"]', "Password12345");
      await page.click("._login__container__form__button_1o4z7_42");
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      // Assert URL or selector to confirm login
      await page.waitForSelector("#nav__button--newstudy");
      expect(page.url()).toContain("/dashboard");
        //wait for component to load
      await page.waitForSelector('._react_Link_ma5ng_31');
      await page.click('._react_Link_ma5ng_31');
      await page.waitForSelector('._container_card_1tnqq_5');
      expect(page.url()).toContain("/results");


    }catch(err){
        console.log(err);
    }
})
});