import { Builder, Locator, until, WebDriver, WebElementPromise } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export async function getBrowserInstance(): Promise<WebDriver> {
    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('window-size=1600,900');
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.manage().setTimeouts({ implicit: 0, pageLoad: 15000, script: 15000 });
    return driver;
}

export async function closeDriver(driver: WebDriver): Promise<void> {
    await driver.quit();
}

export function getWaitedLocator(driver: WebDriver, locator: Locator, timeout = 10000): WebElementPromise {
    return driver.wait(until.elementLocated(locator), timeout);
}

// elementLocated only waits for the element to exist in the DOM. Elements inside a
// Bootstrap modal are located immediately but stay non-interactable during its fade-in
// transition, so clicking them needs an explicit visibility wait as well.
export function getInteractableElement(driver: WebDriver, locator: Locator, timeout = 10000): WebElementPromise {
    return driver.wait(until.elementIsVisible(driver.findElement(locator)), timeout);
}
