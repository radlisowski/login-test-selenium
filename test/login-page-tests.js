const {Builder, By, Key, until} = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();
const assert = require("assert");
const { resolveObjectURL } = require('buffer');

describe('01 The user is able to see the labels and controls including text-boxes, buttons and labels on the Login Page and can interacted with.', async function() {

    beforeEach(async function() {
        await driver.get('https://radlisowski.github.io/login.html');
        let title = await driver.getTitle();
        assert.strictEqual(title, "Rad Lisowski");

        driver.manage().setTimeouts({implicit: 0.5 })
    });

    it('LP01 Verifying visibility of the Page Objects and responsivness on different type of screens', async function() {
        
        //verifying "Login" heading
        let header = await driver.findElement(By.tagName("h5")).getText();
        assert.strictEqual(header, "Login")

        //veryfying username text field
        let usernamePlaceholder = await driver.findElement(By.id("username-field")).getAttribute("placeholder");
        assert.strictEqual(usernamePlaceholder, "username");

        //verifying passowrd text field
        let passwordPlaceholder = await driver.findElement(By.id("password-field")).getAttribute("placeholder");
        assert.strictEqual(passwordPlaceholder, "password");

        //verifying "Login" button
        let loginBtnCaption = await driver.findElement(By.id("signin-button")).getText();
        assert.strictEqual(loginBtnCaption, "Sign in");

        
    });

    it('LP02-Verifying Username text-box can take text input', async function() {
        
        let usernameFld = await driver.findElement(By.id("username-field"));

        await usernameFld.sendKeys("test");

        let enteredText = await usernameFld.getAttribute("value");

        assert.strictEqual(enteredText, "test");
    
        
    })

    it('LP03-Verifying Password text-box can take text input', async function() {
        
        let passwordFld = await driver.findElement(By.id("password-field"));

        await passwordFld.sendKeys("test");
        
        let enteredText = await passwordFld.getAttribute("value");

        assert.strictEqual(enteredText, "test");

        
    })

    it('LP04-Verifying Login button can be pressed', async function() {

        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await loginBtn.click();
    
        let resultMessage = await driver.findElement(By.id('error-message')).getText();

        assert.strictEqual(resultMessage, "Wrong Username or Password");

        
    });

    it('LP05-Verify that as soon as the login page opens, by default the cursor should remain on the username textbox.', async function() {
    
        let focusedElement = await driver.findElement(By.css('input:focus'));

        await focusedElement.sendKeys("focused");

        let enteredText = await driver.findElement(By.id('username-field')).getAttribute("value");

        assert.strictEqual(enteredText, "focused");
    
    });

    it('', async function() {

        await driver.findElement(By.css('body')).sendKeys(Key.TAB)

        let usernameFld = await driver.findElement(By.id("username-field"));

        let focusedElement = await driver.findElement(By.css('input:focus'));
        
        assert.
        assert.equal(usernameFld, focusedElement);
    });

});

// describe('02 The user interacting with the UI via varius actions (positive/negative)', async function(){

//     beforeEach(async function() {
//         await driver.get('https://radlisowski.github.io/login.html');
//         let title = await driver.getTitle();
//         assert.strictEqual(title, "Rad Lisowski");

//         driver.manage().setTimeouts({implicit: 0.5 })
//     })

//     it('LP10-Verify that the user is able to login by entering valid credentials and clicking on the ‘Login’ button.', async function () {

//         let usernameFld = await driver.findElement(By.id('username-field'));
//         let passwordFld = await driver.findElement(By.id('password-field'));
//         let loginBtn = await driver.findElement(By.id('signin-button'));
        
//         await usernameFld.sendKeys('test');
//         await passwordFld.sendKeys('test');
//         await loginBtn.click();
    
//         let resultMessage = await driver.findElement(By.id('success-message')).getText();

//         assert.strictEqual(resultMessage, "Cool Beans!")

//         await driver.quit();
//     });
// });