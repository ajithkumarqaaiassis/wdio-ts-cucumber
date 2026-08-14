class AlertComponent {

    get message() {
        return $('id=android:id/message');
    }

    async getMessage(): Promise<string> {
        await this.message.waitForDisplayed({
            timeout: 10000
        });

        return await this.message.getText();
    }

    async isDisplayed(): Promise<boolean> {
        return await this.message.isDisplayed();
    }
}

export default new AlertComponent();