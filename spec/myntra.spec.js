describe("Create Myntra account and earn referral credits", function () {

    var _10minutesmailBrowser, myntraBrowser, email = "k633683";
    var invitationLink = browser.params.referral_link;
    beforeAll(function () {
        browser.ignoreSynchronization = true;
    });

    function getMailId() {
        if (_10minutesmailBrowser) {
            _10minutesmailBrowser.close();
        }
        _10minutesmailBrowser = browser.forkNewDriverInstance();
        _10minutesmailBrowser.ignoreSynchronization = true;
        _10minutesmailBrowser.get("https://www.10minutemail.com");
        browser.sleep(1000);
        return _10minutesmailBrowser.element(by.id("mailAddress")).getText();
    }

    function claimReward() {
        myntraBrowser.get(invitationLink);
        myntraBrowser.sleep(1000);
    }

    function logOutFromMyntra() {
        myntraBrowser.close();
    }

    function createMyntraAccount() {
        myntraBrowser = browser.forkNewDriverInstance();
        myntraBrowser.ignoreSynchronization = true;
        myntraBrowser.get("https://www.myntra.com/register?referer=https://www.myntra.com/");
        myntraBrowser.element(by.name("email")).sendKeys(email+Math.random().toString(36).substring(4)+"@nwytg.com");
        myntraBrowser.element(by.name("password")).sendKeys("abc123");
        myntraBrowser.element(by.name("mobile")).sendKeys("9999999999");
        myntraBrowser.$("#male").click();
        myntraBrowser.element(by.buttonText("REGISTER")).click();
        myntraBrowser.sleep(3000);
    }

    for (var i = 0; i < 100; i++) {
        it("create account and add referal", function () {
            createMyntraAccount();
            claimReward();
            logOutFromMyntra();
        });
    }
});