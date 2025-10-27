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
    const userNameField = page.locator("//*[@id='userName']"); //перейменувати Field на Input;
    const userEmailField = page.locator("//*[@id='userEmail']");
    const currentAddressField = page.locator("//*[@id='currentAddress']");
    const permanentAddressField = page.locator("//*[@id='permanentAddress']");
    const submitButton = page.locator("//*[@id='submit']");
    const outputSection = page.locator("//div[@id='output']");

    await page.goto(baseUrl + "/text-box");

    await userNameField.fill("Andrew");
    await userEmailField.fill("andrewtest@gmail.com");
    await currentAddressField.fill("Paradise City");
    await permanentAddressField.fill("Unvgvar, Ukraine");

    await submitButton.click();
    await expect(outputSection).toBeVisible();
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
    const expandAllCheckboxes = page.locator("//button[@title='Expand all']");
    const checkAllCheckboxes = page.locator(
      "//span[text()='Home']/..//span[@class='rct-checkbox']"
    );
    await page.goto(baseUrl + "/checkbox");

    await expandAllCheckboxes.click();

    await checkAllCheckboxes.click();

    const labels = [
      page.getByLabel("Home"),
      page.getByLabel("Desktop"),
      page.getByLabel("Notes"),
      page.getByLabel("Commands"),
      page.getByLabel("Documents"),
      page.getByLabel("WorkSpace"),
      page.getByLabel("React"),
      page.getByLabel("Angular"),
      page.getByLabel("Veu"),
      page.getByLabel("Office"),
      page.getByLabel("Public"),
      page.getByLabel("Private"),
      page.getByLabel("Classified"),
      page.getByLabel("General"),
      page.getByLabel("Downloads"),
      page.getByLabel("Word File.doc"),
      page.getByLabel("Excel File.doc"),
    ];

    for (const label of labels) {
      await expect(label).toBeChecked(); //переписати з pagegetbyLabel один раз, а не багато
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
    await page.goto(baseUrl + "/radio-button");
    const yesRadioLabel = page.locator("//label[@for='yesRadio']");
    const yesRadioInput = page.locator("//input[@id='yesRadio']");
    const yesChoosenRadio = page.locator("//p[contains(text(), 'You have selected')]");
    const impressiveRadioLabel = page.locator("//label[@for='impressiveRadio']");
    const impressiveRadioInput = page.locator("//input[@id='impressiveRadio']");
    const impressiveChoosenRadio = page.locator("//span[text()='Impressive']");
    const noRadio = page.locator("//input[@id='noRadio']");

    await yesRadioLabel.click();
    await expect(yesRadioInput).toBeChecked();
    await expect(yesChoosenRadio).toBeVisible();

    await impressiveRadioLabel.click();
    await expect(impressiveRadioInput).toBeChecked();
    await expect(impressiveChoosenRadio).toBeVisible();

    await expect(noRadio).toBeDisabled();
  }
);
