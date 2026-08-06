export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: ['./test/specs/**/*.ts'],
    exclude: [],

    maxInstances: 1,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', 'window-size=1600,900']
            }
        }
    ],

    baseUrl: 'https://automationexercise.com',

    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 30000
    }
};
