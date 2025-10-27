import { test, expect } from "@playwright/test";

test(
  "DEMOQA-0001 User can submit the form with valid data",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "Positive case for submit the form",
    },
  },

  async ({ page }) => {
    await page.goto("/text-box");

    await page.locator("//*[@id='userName']").fill("Andrew");
    await page.locator("//*[@id='userEmail']").fill("andrewtest@gmail.com");
    await page.locator("//*[@id='currentAddress']").fill("Paradise City");
    await page.locator("//*[@id='permanentAddress']").fill("Unvgvar, Ukraine");
    await page.locator("//*[@id='submit']").click();
    
    await expect(page.locator("//div[@id='output']")).toBeVisible();
  }
);

test(
  "DEMOQA-0002 All checkboxes can be selected",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Checkboxes functionality",
    },
  },

  async ({ page }) => {
    await page.goto("/checkbox");

    await page.locator("//button[@title='Expand all']").click();

    await page
      .locator("//span[text()='Home']/..//span[@class='rct-checkbox']")
      .click();

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
  "DEMOQA-0003 All radio buttons can be selected one by one",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Radio Buttons functionality",
    },
  },

  async ({ page }) => {
    await page.goto("/radio-button");

    await page.locator("//label[@for='yesRadio']").click();
    await expect(page.locator("//input[@id='yesRadio']")).toBeChecked();
    await expect(
      page.locator("//p[contains(text(), 'You have selected')]")
    ).toBeVisible();

    await page.locator("//label[@for='impressiveRadio']").click();

    await expect(page.locator("//input[@id='impressiveRadio']")).toBeChecked();
    await expect(page.locator("//span[text()='Impressive']")).toBeVisible();
    
    await expect(page.locator("//input[@id='noRadio']")).toBeDisabled();
  }
);
