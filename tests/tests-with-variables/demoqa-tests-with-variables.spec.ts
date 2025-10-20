import { test, expect } from "@playwright/test";

const baseUrl = "https://demoqa.com";

test(
  "VAR-0012 User can submit the form with valid data",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "Positive case for submit the form",
    },
  },

  async ({ page }) => {
    const userNameField = "//*[@id='userName']";
    const userEmailField = "//*[@id='userEmail']";
    const currentAddressField = "//*[@id='currentAddress']";
    const permanentAddressField = "//*[@id='permanentAddress']";
    const submitButton = "//*[@id='submit']";
    const outputSection = "//div[@id='output']";
    await page.goto(baseUrl + "/text-box");

    await expect(page.locator(userNameField)).toBeVisible();
    await page.locator(userNameField).fill("Andrew");

    await expect(page.locator(userEmailField)).toBeVisible();
    await page.locator(userEmailField).fill("andrewtest@gmail.com");

    await expect(page.locator(currentAddressField)).toBeVisible();
    await page.locator(currentAddressField).fill("Paradise City");

    await expect(page.locator(permanentAddressField)).toBeVisible();
    await page.locator(permanentAddressField).fill("Unvgvar, Ukraine");

    await page.locator(submitButton).click();
    await expect(page.locator(outputSection)).toBeVisible();
  }
);

test(
  "VAR-0013 All checkboxes can be selected",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Checkboxes functionality",
    },
  },

  async ({ page }) => {
    const expandAllCheckboxes = "//button[@title='Expand all']";
    const checkAllCheckboxes = "//span[text()='Home']/..//span[@class='rct-checkbox']";
    await page.goto(baseUrl + "/checkbox");

    await page.locator(expandAllCheckboxes).click();

    await page.locator(checkAllCheckboxes).click();

    const labels = [
      "Home",
      "Desktop",
      "Notes",
      "Commands",
      "Documents",
      "WorkSpace",
      "React",
      "Angular",
      "Veu",
      "Office",
      "Public",
      "Private",
      "Classified",
      "General",
      "Downloads",
      "Word File.doc",
      "Excel File.doc",
    ];

    for (const label of labels) {
      await expect(page.getByLabel(label)).toBeChecked();
    }
  }
);



test(
  "VAR-0014 All radio buttons can be selected one by one",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Radio Buttons functionality",
    },
  },

  async ({ page }) => {
    await page.goto(baseUrl+"/radio-button");
    const yesRadio = "//label[@for='yesRadio']";
    const impressiveRadio = "//label[@for='impressiveRadio']";
    const noRadio = "//input[@id='noRadio']";

    await page.locator(yesRadio).click();
    await expect(page.locator("//input[@id='yesRadio']")).toBeChecked();
    await expect(
      page.locator("//p[contains(text(), 'You have selected')]")
    ).toBeVisible();

    await page.locator(impressiveRadio).click();
    await expect(page.locator("//input[@id='impressiveRadio']")).toBeChecked();
    await expect(page.locator("//span[text()='Impressive']")).toBeVisible();

    await expect(page.locator(noRadio)).toBeDisabled();
  }
);
