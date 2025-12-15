import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Network Mocking and Routing", () => {
  test("All 3 route() in one test", async ({ page }) => {
    const fakerTitle = faker.lorem.words(5);
    const mockUser = {
      email: "kante8812@gmail.com",
      token: "jwt.token.mock.12345",
      username: "kante",
      bio: "I'm a mocked user!",
      image: "https://api.realworld.io/images/smiley-cyrus.jpg",
    };

    // ROUTE 0 + 1: Mock авторизації (GET + POST)
    await page.route("**/api/user*", async (route, request) => {
      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ user: mockUser }),
        });
      } else if (
        request.method() === "POST" &&
        request.url().includes("login")
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ user: mockUser }),
        });
      } else if (request.method() === "PUT") {
        // ROUTE 3: Апдейт профайлу
        const userData = request.postDataJSON()?.user || {};
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            user: {
              ...mockUser,
              ...userData,
              token: "jwt.token.updated",
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    // ROUTE 2: Створення артіклу з faker title
    await page.route("**/api/articles", async (route, request) => {
      if (request.method() === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({
            article: {
              slug: faker.helpers.slugify(fakerTitle).toLowerCase(),
              title: fakerTitle,
              description: faker.lorem.sentence(),
              body: faker.lorem.paragraphs(2),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tagList: ["qa-automation"],
              favorited: false,
              favoritesCount: 0,
              author: {
                username: mockUser.username,
                bio: mockUser.bio,
                image: mockUser.image,
                following: false,
              },
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    // КРОК 1: Логін з РАНДОМНИМИ неправильними кредами
    await page.goto("https://demo.learnwebdriverio.com/login");

    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    console.log(`Trying with: ${randomEmail} / ${randomPassword}`);

    await page.locator('input[type="email"]').fill(randomEmail);
    await page.locator('input[type="password"]').fill(randomPassword);
    await page.locator('button:has-text("Sign in")').click();

    await expect(page.locator('a:has-text("New Article")')).toBeVisible();
    console.log(`Logged in as "${mockUser.username}" with random credentials!`);

    // КРОК 2: Створення артіклу (title замінюється на faker)
    await page.locator('a:has-text("New Article")').click();

    await page.locator('input[placeholder*="Article Title"]').fill("Original");
    await page.locator('input[placeholder*="about"]').fill("Description");
    await page.locator("textarea").fill("Body text");

    const articlePromise = page.waitForResponse("**/api/articles");
    await page.locator('button:has-text("Publish Article")').click();
    const articleResponse = await articlePromise;

    const articleData = await articleResponse.json();
    expect(articleData.article.title).toBe(fakerTitle);
    console.log(`Article is updated with faker title!`);

    // КРОК 3: Апдейт профайлу (завжди 200 НАВІТЬ з невалідними даними)
    await page.locator('a:has-text("Settings")').click();

    // Генеруємо НЕВАЛІДНИЙ email (без @)
    const invalidEmail = faker.internet.username() + "_invalid_email";
    const invalidUrl = "this-is-not-a-url";

    await page
      .locator('input[placeholder="URL of profile picture"]')
      .fill(invalidUrl);
    await page
      .locator('textarea[placeholder="Short bio about you"]')
      .fill("<script>alert('xss')</script>");
    await page.locator('input[placeholder="Email"]').fill(invalidEmail);

    const profilePromise = page.waitForResponse("**/api/user");
    await page.locator('button:has-text("Update Settings")').click();
    const profileResponse = await profilePromise;

    expect(profileResponse.status()).toBe(200);
    console.log(`User profile is updated`);
  });
});
