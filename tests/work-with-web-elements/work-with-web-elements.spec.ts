import { test, expect, Page } from "@playwright/test";
import { format, compareAsc, addWeeks, addYears } from "date-fns";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("textbox", { name: "Standard Text Input:" })
    .fill("test");
  await page
    .getByRole("textbox", { name: "Password:" })
    .pressSequentially("this is my password just to check", { delay: 10 });

  await page.getByRole("spinbutton", { name: "Number:" }).fill("341251");

  const date = format(addYears(new Date(), -1), "yyyy-MM-dd");
  console.log(date);

  await page.getByRole("textbox", { name: "Date:" }).fill(date);

  const text = `tewsrts
  statast
  satast
  asfaf`;

  console.log(text);

  // await page.getByRole("textbox", { name: "Textarea:" }).fill(text);

  const textArea = page.getByRole("textbox", { name: "Textarea:" });

  await textArea.click();

  await page.keyboard.down("Shift");
  await page.keyboard.type("tewsrts tasfafsa", { delay: 500 });
  await page.keyboard.up("Shift");

  // await textArea.pressSequentially("tewsrts tasfafsa", { delay: 500 });

  await textArea.press("Enter", { delay: 500 });
  await textArea.pressSequentially("tewsrts", { delay: 500 });
  await textArea.press("Enter", { delay: 500 });
  await textArea.pressSequentially("tewsrts", { delay: 500 });

  await page
    .getByRole("textbox", { name: "Textarea:" })
    .fill("tewsrts\nstatast\nsatast asfasfa asfasf\nasfaf ");

  const richTextEditor = page.locator("#rich-text-editor");

  await richTextEditor.fill(`Edit this rich tex
test
test

asfasfa

afasf
`);

  const content = await richTextEditor.textContent();
  const allContent = await page.locator("#inputs-section").allTextContents();
  const innerContent = await richTextEditor.allInnerTexts();

  console.log(content);
  console.log(allContent);
  console.log(innerContent);

  await page.getByRole("checkbox", { name: "Option 1" }).check();
  await page.getByRole("checkbox", { name: "Option 2" }).check();
  await page.getByRole("checkbox", { name: "Option 2" }).uncheck();
  await page.getByRole("checkbox", { name: "Option 1" }).uncheck();

  //Male
  //Female
  await page.getByRole("radio", { name: "Male", exact: true }).check();
  await page.getByRole("radio", { name: "Male", exact: true }).check();
  await page.getByRole("radio", { name: "Female" }).check();
  await page.getByRole("radio", { name: "Male", exact: true }).check();

  // await page.getByLabel("Single Select:").selectOption("saab");

  await page.getByLabel("Single Select:").click();
  await page.locator('option[value = "volvo"]').click({ force: true });

  await page.getByLabel("Multiple Select:").selectOption("red");

  // upload/localhost.har
  await page
    .getByRole("spinbutton", { name: "Server Delay (ms):" })
    .fill("11000");

  await page
    .getByRole("button", { name: "Choose File:" })
    .setInputFiles("upload/localhost.har");

  await page.locator("#upload-btn").click();
  await expect(page.locator(".success-msg")).toBeVisible({ timeout: 30_000 });

  let iter = 1;
  await expect(async () => {
    console.log(iter);
    iter++;

    await page.locator("#start-flaky-btn").click();
    await expect(page.locator("#flaky-success-btn")).toBeVisible({
      timeout: 5_000,
    });
  }).toPass({
    intervals: [3_000],
    timeout: 60_000,
  });
  });