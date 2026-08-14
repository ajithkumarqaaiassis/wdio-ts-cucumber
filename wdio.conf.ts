import dotenv from 'dotenv';
import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import allureReporter from '@wdio/allure-reporter';

dotenv.config();

export const config = {

    runner: 'local',

    specs: [
        './features/**/*.feature'
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: process.env.PLATFORM_NAME || 'Android',

        'appium:automationName':
            process.env.AUTOMATION_NAME || 'UiAutomator2',

        'appium:deviceName':
            process.env.DEVICE_NAME || 'emulator-5554',

        'appium:appPackage':
            process.env.APP_PACKAGE,

        'appium:appActivity':
            process.env.APP_ACTIVITY,

        'appium:noReset': true
    }],

    logLevel: 'info',

    framework: 'cucumber',

    reporters: [
        'spec',

        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],

    services: [
        ['appium', {
            command: 'appium'
        }]
    ],

    cucumberOpts: {

        require: [
            './features/step-definitions/**/*.ts'
        ],

        backtrace: false,

        dryRun: false,

        failFast: false,

        snippets: true,

        source: true,

        strict: true,

        timeout: 60000
    },

    beforeScenario: async function () {
        console.log('Starting Cucumber scenario');
    },

    afterScenario: async function (
    world: ITestCaseHookParameter,
    result: {
        passed: boolean;
        error?: string;
        duration?: number;
    }
) {

    if (!result.passed) {

        const screenshot = await browser.takeScreenshot();

        allureReporter.addAttachment(
            'Failure Screenshot',
            Buffer.from(screenshot, 'base64'),
            'image/png'
        );

        await browser.saveScreenshot(
            `./screenshots/${Date.now()}.png`
        );
    }
}
    
};