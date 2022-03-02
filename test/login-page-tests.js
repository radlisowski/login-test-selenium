const {Builder, By, Key, until} = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();
const assert = require("assert");
const { resolveObjectURL } = require('buffer');
const { type } = require('os');

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
        
        await enterUsername('test');

        let enteredText = await driver.findElement(By.id('username-field')).getAttribute("value");

        assert.strictEqual(enteredText, "test");
    })

    it('LP03-Verifying Password text-box can take text input', async function() {
        
        enterPassword("test");
        
        let enteredText = await driver.findElement(By.id('password-field')).getAttribute("value");

        assert.strictEqual(enteredText, "test");
    })

    it('LP04-Verifying Login button can be pressed', async function() {

        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await loginBtn.click();
    
        let resultMessage = await driver.findElement(By.id('error-message')).getText();

        assert.strictEqual(resultMessage, "Wrong Username or Password");
    });

    it('LP05-Verify that as soon as the login page opens, by default the cursor should remain on the username textbox.', async function() {
    
        await driver.sleep(2000);

        await driver.findElement(By.css('input:focus')).sendKeys("focused");

        let enteredText = await driver.findElement(By.id('username-field')).getAttribute("value");

        assert.strictEqual(enteredText, "focused");
    
    });

    it('LP06-Verify that the user is able to navigate to "Password" field by pressing "TAB" key on the keyboard.', async function() {

        await driver.sleep(2000);

        await driver.findElement(By.css('body')).sendKeys(Key.TAB)

        await driver.findElement(By.css('input:focus')).sendKeys("tabTest");

        let enteredText = await driver.findElement(By.id('password-field')).getAttribute("value");
    
        assert.equal(enteredText, "tabTest");
    });

    it('LP07-Verify that the user is able to navigate to "Login" button by pressing "TAB" key on the keyboard.', async function() {

        await driver.findElement(By.css('body')).sendKeys(Key.TAB);
        await driver.findElement(By.css('body')).sendKeys(Key.TAB);
        
        await driver.findElement(By.id("signin-button")).sendKeys(Key.ENTER)
    
        let resultMessage = await driver.findElement(By.id('error-message')).getText();

        assert.strictEqual(resultMessage, "Wrong Username or Password");
    });

    it(`LP08-Verifying that the pasword as it is being typed in is being hashed and can't be copied`, async function() {

        let passwordFldType = await driver.findElement(By.id("password-field")).getAttribute("type");

        assert.strictEqual(passwordFldType, "password");
    })
});

describe('02 The user interacting with the UI via varius actions (positive/negative)', async function(){

    beforeEach(async function() {
        await driver.get('https://radlisowski.github.io/login.html');
        let title = await driver.getTitle();
        assert.strictEqual(title, "Rad Lisowski");

        driver.manage().setTimeouts({implicit: 0.5 })
    })

    it('LP09-Verify that the user is able to login by entering valid credentials and clicking on the ‘Login’ button.', async function () {

        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await enterUsername('test');
        await enterPassword('test');
        await loginBtn.click();
    
        let resultMessage = await driver.findElement(By.id('success-message')).getText();

        assert.strictEqual(resultMessage, "Cool Beans!")
    });

    it(`LP10-Verify that the user is able to login by entering valid credentials and pressing Enter key.`, async function() {

        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await enterUsername('test');
        await enterPassword('test');
        await loginBtn.sendKeys(Key.ENTER);
    
        let resultMessage = await driver.findElement(By.id('success-message')).getText();

        assert.strictEqual(resultMessage, "Cool Beans!")
    })

    it(`LP11=Verify that the user is NOT able to login by entering INVALID credentials and clicking on the ‘Login’ button.`, async function() {

        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await enterUsername('bla');
        await enterPassword('blabla');
        await loginBtn.click();
    
        let resultMessage = await driver.findElement(By.id('error-message')).getText();

        assert.strictEqual(resultMessage, "Wrong Username or Password");
    })

    it(`LP12-Verify that the validation message gets displayed in case the user leaves the username field as blank and that the message does not indicate which is wrong or empty.`, async function() {
        
        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await enterPassword('blabla');

        await loginBtn.click();
    
        let resultMessage = await driver.findElement(By.id('error-message')).getText();

        assert.strictEqual(resultMessage, "Wrong Username or Password");
    })

    it(`LP13-Verify that the validation message gets displayed in case the user leaves the password field as blank and that the message does not indicate which is wrong or empty.`, async function() {

        let loginBtn = await driver.findElement(By.id('signin-button'));
        
        await enterUsername('blabla');

        await loginBtn.click();
    
        let resultMessage = await driver.findElement(By.id('error-message')).getText();

        assert.strictEqual(resultMessage, "Wrong Username or Password");

        await driver.quit();
    })
});

async function enterUsername(username) {

    let usernameFld = await driver.findElement(By.id('username-field')); 
    await usernameFld.sendKeys(username);
}

async function enterPassword(password) {

    let passwordFld = await driver.findElement(By.id('password-field')); 
    await passwordFld.sendKeys(password);
}

