import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Network Mocking and Routing", () => {
  test("All 3 route() in one test", async ({ page }) => {
    const fakerTitle = faker.lorem.words(5);

    console.log(`Generated faker title: ${fakerTitle}`);

    // ROUTE 0: Mock GET /api/user/
    await page.route("**/api/user/", async (route, request) => {
      if (request.method() === "GET") {
        console.log("🎯 Route 0: GET user intercepted!");
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            user: {
              email: "kante80@gmail.com",
              token: "jwt.token.here.mock.12345",
              username: "kante",
              bio: "I'm a mocked user!",
              image: "https://api.realworld.io/images/smiley-cyrus.jpg",
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    //ROUTE 1: Логін
    await page.route("**/api/users/login", async (route) => {
      console.log("Route 1: Login intercepted!");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          user: {
            email: "kante80@gmail.com",
            token: "jwt.token.here.mock.12345",
            username: "kante",
            bio: "I'm a mocked user!",
            image: "https://api.realworld.io/images/smiley-cyrus.jpg",
          },
        }),
      });
    });

    // ROUTE 2: Створення артіклу
    await page.route("**/api/articles", async (route, request) => {
      if (request.method() === "POST") {
        console.log("🎯 Route 2: Article creation intercepted!");

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
              tagList: [faker.word.noun(), faker.word.verb(), "qa-automation"],
              favorited: false,
              favoritesCount: 0,
              author: {
                username: "kante",
                bio: "I'm a mocked user!",
                image: "https://api.realworld.io/images/smiley-cyrus.jpg",
                following: false,
              },
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    // ROUTE 3: Апдейт профайлу - ВИПРАВЛЕНО
    await page.route("**/api/user", async (route, request) => {
      if (request.method() === "PUT") {
        console.log("🎯 Route 3: Profile update intercepted!");

        let requestBody;
        try {
          requestBody = request.postDataJSON();
        } catch (e) {
          requestBody = {};
        }

        const userData = requestBody.user || requestBody;

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            user: {
              email: userData.email || "updated31@email.com",
              token: "jwt.token.updated",
              username: userData.username || "Updated31Username",
              bio: userData.bio || "Updated bio via mock!",
              image:
                userData.image ||
                "https://api.realworld.io/images/demo-avatar.png",
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    // КРОК 1: Логін
    await page.goto("https://demo.learnwebdriverio.com/login");
    await page.waitForLoadState("domcontentloaded");

    await page.locator('input[type="email"]').fill("wrong@email.com");
    await page.locator('input[type="password"]').fill("wrongpassword123");

    const loginPromise = page.waitForRequest(
      (request) =>
        request.url().includes("/api/users/login") &&
        request.method() === "POST"
    );

    await page.locator('button:has-text("Sign in")').click();

    const loginRequest = await loginPromise;
    console.log(
      "✅ Login request sent:",
      loginRequest.method(),
      loginRequest.url()
    );

    await page.waitForResponse("**/api/users/login");
    await page.waitForURL("https://demo.learnwebdriverio.com/", {
      timeout: 10000,
    });

    await expect(page.locator('a:has-text("New Article")')).toBeVisible({
      timeout: 10000,
    });
    console.log("Крок 1: Залогінились успішно!");

    //КРОК 2: Створення артіклу
    await page.locator('a:has-text("New Article")').click();

    await page
      .locator('input[placeholder*="Article Title"]')
      .fill("This will be replaced!");
    await page.locator('input[placeholder*="about"]').fill("Description");
    await page.locator("textarea").fill("Body text");

    const articlePromise = page.waitForResponse("**/api/articles");
    await page.locator('button:has-text("Publish Article")').click();
    const articleResponse = await articlePromise;

    const articleData = await articleResponse.json();
    console.log(`Крок 2: Article title: "${articleData.article.title}"`);

    expect(articleData.article.title).toBe(fakerTitle);

    //КРОК 3: Апдейт профайлу
    await page.locator('a:has-text("Settings")').click();

    await page
      .locator('textarea[placeholder="Short bio about you"]')
      .waitFor({ state: "visible" });

    await page
      .locator('input[placeholder="URL of profile picture"]')
      .fill("https://example.com/avatar.png");
    await page
      .locator('textarea[placeholder="Short bio about you"]')
      .fill("Mocked bio!");
    await page.locator('input[placeholder="Email"]').fill("mocked31@email.com");

    const profilePromise = page.waitForResponse("**/api/user");
    await page.locator('button:has-text("Update Settings")').click();
    const profileResponse = await profilePromise;

    expect(profileResponse.status()).toBe(200);
    console.log("Крок 3: Profile updated!");

    console.log("All 3 route() are working!");
  });
});
