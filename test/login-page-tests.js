const {Builder, By, Key, until} = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();
const assert = require("assert");
const { resolveObjectURL } = require('buffer');


describe('01 The user interacting with the UI via varius actions (positive/negative)', async function(){

    beforeEach(async function() {
        
        await driver.get('https://radlisowski.github.io/login.html');
    })

    it('LP10-Verify that the user is able to login by entering valid credentials and clicking on the ‘Login’ button.', async function helloSelenium() {

        await driver.getTitle();    
        driver.manage().setTimeouts({implicit: 0.5 })
    
        let usernameFld = await driver.findElement(By.id('username-field'));
        let passwordFld = await driver.findElement(By.id('password-field'));
        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await usernameFld.sendKeys('test');
        await passwordFld.sendKeys('test');
        await loginBtn.click();
    
        let resultMessage = await driver.findElement(By.id('success-message')).getText();

        assert.strictEqual(resultMessage, "Cool Beans!")

        await driver.quit();
    })();
    });