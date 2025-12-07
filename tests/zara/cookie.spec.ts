import { test, expect } from "@playwright/test";

test("zara, accept cookies", async ({ page, context }) => {
  await page.goto("https://www.zara.com/es/en/");
  await page.getByRole("button", { name: "Accept All Cookies" }).click();
  await page.getByRole("button", { name: "Yes, continue on Spain" }).click();

// CRUD - Create Read Update Delete 

//Create
await page.context().addCookies([{
    name: "test", 
    value: "125151",
    domain: "zara.com"
}])

  //Get cookies - 2 способи роботи з кукі в тестах: виклик з пейджі і за допомогою фікстур
  const contextFromPage = await page.context().cookies();
  const contextFromFix = await context.cookies();
});

