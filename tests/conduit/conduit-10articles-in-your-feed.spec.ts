import { test, expect } from "@playwright/test";

test(
  "ART-0001 Create 10 article and verify that all of them in your feed",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Create 10 article and verify that all of them in your feed",
    },
  },

  async ({ page }) => {
    await page.goto("https://demo.learnwebdriverio.com/register");

    const timestamp = Date.now();
    const testEmail = `user${timestamp}@gmail.com`;
    const testPassword = "test1234";
    const testUsername = `User${timestamp}`;

    await page.getByRole("textbox", { name: "Username" }).fill(testUsername);
    await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(testPassword);
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(
      page
        .getByRole("navigation")
        .filter({ hasText: "conduit Home New Article" })
    ).toBeVisible();

    const articleTitles: string[] = [];

    for (let i = 0; i <= 10; i++) {
      const articleTitle = `Test Article ${i} - ${timestamp}`;
      const articleDescription = `Description for article ${i}`;
      const articleBody = `This is the body content for test article number ${i}`;
      const articleTags = `tag${i}`;

      await page.getByPlaceholder("Article Title").fill(articleTitle);
      await page
        .getByPlaceholder("What's this article about?")
        .fill(articleDescription);
      await page
        .getByPlaceholder("Write your article (in markdown)")
        .fill(articleBody);
      await page.getByPlaceholder("Enter tags").fill(articleTags);

      await page.getByRole("button", { name: "Publish Article" }).click();

      articleTitles.push(articleTitle);
    }
  }
);
