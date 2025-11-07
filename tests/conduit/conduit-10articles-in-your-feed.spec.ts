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

    for (let i = 1; i <= 10; i++) {
      const articleTitle = `Test Article ${i} - ${timestamp}`;
      const articleDescription = `Description for article ${i}`;
      const articleBody = `This is the body content for test article number ${i}`;
      const articleTags = `tag${i}`;

      await page.locator('a[href="/editor"]').click();

      await page.locator('[data-qa-id="editor-title"]').fill(articleTitle);
      await page
        .locator('[data-qa-id="editor-description"]')
        .fill(articleDescription);
      await page.locator('[data-qa-id="editor-body"]').click();
      await page.keyboard.type(articleBody);
      await page.locator('[data-qa-id="editor-tags"]').fill(articleTags);

      await page.locator('[data-qa-id="editor-publish"]').click();

      articleTitles.push(articleTitle);

      await expect(page.locator("h1")).toContainText(articleTitle);

      console.log(`Created article ${i}: ${articleTitle}`);
    }

    await page.locator('a.nav-link[href="/"]').click();

    const headerUsername = await page
      .locator('nav a.nav-link[href^="/@"]')
      .textContent();
    const ourUsername = headerUsername?.trim();
    console.log(`Our username: ${ourUsername}`);

    // Перевіряємо останні 10 статей в Global Feed
    for (const title of articleTitles) {
      console.log(`Looking for article: ${title}`);

      const articlePreview = page
        .locator(".article-preview")
        .filter({ hasText: title })
        .first();

      await expect(articlePreview).toBeVisible();

      const articleAuthor = await articlePreview
        .locator('[data-qa-type="author-name"]')
        .textContent();

      console.log(`Expected: "${ourUsername}"`);
      console.log(`Got: "${articleAuthor?.trim()}"`);

      expect(articleAuthor?.trim()).toBe(ourUsername);

      console.log(
        `✓ Verified article "${title}" by author: ${articleAuthor?.trim()}`
      );
    }

    console.log("✓ All 10 articles successfully verified with correct author!");
  }
);
