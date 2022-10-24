import {Page,chromium, Browser} from 'playwright';

describe('Login', () => {
    let browser:Browser;
  let page:Page;
  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  })
  
  it('should display "localhost" text on title', async () => {
    await page.goto('http://localhost:8080')
    const title = await page.title();
    expect(title).toContain('');
  });
  it('test if 1st memo is 十四億人不同意 ', async () => {
    await page.goto('http://localhost:8080')
    const firstMemo = await page.locator("body > div > div.right-container > div:nth-child(1) > input");
    const firstMemoText= await firstMemo.inputValue();
    expect(firstMemoText).toBe('十四億人不同意');
  });
  it('test if 4th memo is 康復香港', async () => {
    await page.goto('http://localhost:8080')
    const memos= await page.locator(".memo-container > input");
    const memo=await memos.nth(3);
    expect(await memo.inputValue()).toBe('康復香港')
  });
  it('test click on login button', async () => {
    await page.goto('http://localhost:8080')
    await page.locator("#login-form > label:nth-child(1) > input[type=text]").fill("gordon@tecky.io");
    await page.locator("#login-form > label:nth-child(2) > input[type=password]").fill("tecky");
    const loginButton = await page.locator("#login-form > input[type=submit]");
    await loginButton.click();
    let logoutLink=await page.locator("body > div > div.left-container > div.user-container > a").innerText()
    expect(logoutLink).toBe('Logout');
  });
  it('test if there is 99 memos', async () => {
    await page.goto('http://localhost:8080')
    const memos= await page.locator(".memo-container");
    const memosCount=await memos.count();
    expect(memosCount).toBe(99)
  });
  afterAll(() =>{
    browser.close();
  })
})