import {
    Given,
    When,
    Then
} from '@wdio/cucumber-framework';
import allureReporter from '@wdio/allure-reporter';
import AlertComponent
    from '../../src/components/alert.component';

import LoginPage from '../../src/pageobjects/login.page';
import users from '../../src/testdata/users.json';

Given(
    'the user navigates to the Login screen',
    async () => {
        allureReporter.addStep('Navigate to Login screen');
         allureReporter.addFeature('Login');
        allureReporter.addSeverity('critical');
        await LoginPage.openLoginScreen();
    }
    
);

When(
    'the user enters valid login credentials',
    async () => {
        allureReporter.addStep('Enter valid user credentials');
        await LoginPage.enterEmail(
            users.validUser.email
        );

        await LoginPage.enterPassword(
            users.validUser.password
        );
    }
);

When(
    'the user taps the Login button',
    async () => {
        allureReporter.addStep('the user taps the Login button');
        await LoginPage.clickLogin();
    }
);

Then(
    'the message {string} should be displayed',
    async (expectedMessage: string) => {
         allureReporter.addStep('the message should be displayed');

        await expect(
            AlertComponent.message
        ).toBeDisplayed();

        await expect(
            AlertComponent.message
        ).toHaveText(expectedMessage);
    }
);