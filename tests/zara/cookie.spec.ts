import { test, expect } from "@playwright/test";

test("zara, accept cookies", async ({ page, context }) => {
  await page.goto("https://www.zara.com/es/en/");
  await page.getByRole("button", { name: "Accept All Cookies" }).click();
  await page.getByRole("button", { name: "Yes, continue on Spain" }).click();

  // CRUD - Create Read Update Delete

  //Create
  await page.context().addCookies([
    {
      name: "test",
      value: "125151",
      domain: ".zara.com",
      path: "/",
    },
  ]);

  //Get cookies
  const contextFromFix = await context.cookies();

  //Update
  const newCookies = contextFromFix.map((cookies) => {
    if (cookies.name === "test") {
      cookies.value = "changed";
    }

    return cookies;
  });

  await page.context().clearCookies();
  await page.context().addCookies(newCookies);

  //Clear cookies
  const contextFromPage = await page.context().cookies();

  expect(
    contextFromFix.filter((cookies) => cookies.name === "test")
  ).toBeTruthy();
});
