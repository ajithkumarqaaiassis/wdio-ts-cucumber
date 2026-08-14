class LoginPage {

    get loginTab() {
        return $('android=new UiSelector().text("Login")');
    }

    get emailInput() {
        return $('~input-email');
    }

    get passwordInput() {
        return $('~input-password');
    }

    get loginButton() {
        return $('~button-LOGIN');
    }

    async openLoginScreen() {
        await this.loginTab.waitForDisplayed({
            timeout: 10000
        });

        await this.loginTab.click();
    }

    async enterEmail(email: string) {
        await this.emailInput.waitForDisplayed({
            timeout: 10000
        });

        await this.emailInput.setValue(email);
    }

    async enterPassword(password: string) {
        await this.passwordInput.setValue(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}

export default new LoginPage();