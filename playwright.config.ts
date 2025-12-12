import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  //globalSetup: "./globalSetup.ts",
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  timeout: 90 * 1000, // Додаємо глобальний timeout

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    //baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    baseURL: process.env.BASEURL,
    actionTimeout: 30 * 1000,
    navigationTimeout: 60 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "coffee-cart",
      testDir: "tests/coffee-cart",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://coffee-cart.app/",
      },
    },

    {
      name: "css-selectors-and-aria-attributes",
      testDir: "tests/css-selectors-and-aria-atributes",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://coffee-cart.app/",
        storageState: undefined,
      },
    },

    {
      name: "conduit",
      testDir: "tests/conduit",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.BASEURL,
        //storageState: "storageState.json",
      },
    },

    {
      name: "XPath",
      testDir: "tests/XPath",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://demoqa.com",
        storageState: undefined,
      },
    },

    {
      name: "tests-with-variables",
      testDir: "tests/tests-with-variables",
      use: {
        ...devices["Desktop Chrome"],
        storageState: undefined,
      },
    },

    {
      name: "unit-tests-with-functions",
      testDir: "tests/unit-tests-with-functions",
    },

    {
      name: "tests-with-functions",
      testDir: "tests/tests-with-functions",
    },

    {
      name: "tests-with-objects",
      testDir: "tests/tests-with-objects",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://demoqa.com",
        storageState: undefined,
      },
    },

    {
      name: "OOP-tests-hw",
      testDir: "tests/OOP-tests-hw",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://....",
        storageState: undefined,
      },
    },

    {
      name: "OOP-tests-with-fixtures",
      testDir: "tests/OOP-tests-with-fixtures",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://....",
        storageState: undefined,
      },
    },

    {
      name: "work-with-web-elements",
      testDir: "tests/work-with-web-elements",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://....",
        storageState: undefined,
      },
    },

    {
      name: "zara",
      testDir: "tests/zara",
      timeout: 120 * 1000, // 120 секунд на тест
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://www.zara.com/ua/uk/",
        navigationTimeout: 90 * 1000, // 90 секунд на навігацію
        actionTimeout: 30 * 1000,
        storageState: undefined,
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
