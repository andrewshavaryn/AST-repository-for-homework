import { test, expect } from "@playwright/test";

test.describe("Zara Cookies Tests", () => {
  test("Cookies-0001 - Accept cookies, verify count and modify cookie", async ({
    page,
    context,
  }) => {
    // 1. Відкриваємо сайт
    await page.goto("https://www.zara.com");

    // 2. Чекаємо і клікаємо на cookie button
    const cookieButton = page.getByRole("button", {
      name: "Accept All Cookies",
    });
    await cookieButton.waitFor({ state: "visible" });
    await cookieButton.click();

    // 3. Отримуємо всі cookies і перевіряємо їх кількість
    const allCookies = await context.cookies();
    console.log(`Загальна кількість cookies: ${allCookies.length}`);
    console.log("Назви cookies:", allCookies.map((c) => c.name).join(", "));

    expect(allCookies.length).toBeGreaterThan(0);

    // 4. Змінюємо будь-який cookie на будь-яке значення
    const cookieToModify = allCookies[0];
    console.log(`Змінюємо cookie: ${cookieToModify.name}`);
    console.log(`Оригінальне значення: ${cookieToModify.value}`);

    const updatedCookies = allCookies.map((cookie) => {
      if (cookie.name === cookieToModify.name) {
        cookie.value = "modified_test_value_12345";
      }
      return cookie;
    });

    await context.clearCookies();
    await context.addCookies(updatedCookies);

    const finalCookies = await context.cookies();
    const modifiedCookie = finalCookies.find(
      (c) => c.name === cookieToModify.name
    );

    console.log(`Нове значення: ${modifiedCookie?.value}`);
    expect(modifiedCookie?.value).toBe("modified_test_value_12345");
  });

  test("Cookies-0002 - Work with specific cookie - OptanonConsent", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Accept All Cookies" }).click();

    // Шукаємо конкретний cookie (OptanonConsent)
    const cookies = await context.cookies();
    console.log("All cookies:", cookies.map((c) => c.name).join(", "));

    const consentCookie = cookies.find((c) => c.name === "OptanonConsent");

    if (consentCookie) {
      console.log("OptanonConsent cookie found");
      console.log("Original value:", consentCookie.value);

      // Змінюємо його значення
      const updatedCookies = cookies.map((cookie) => {
        if (cookie.name === "OptanonConsent") {
          cookie.value = "custom_consent_value";
        }
        return cookie;
      });

      await context.clearCookies();
      await context.addCookies(updatedCookies);

      // Перевіряємо зміну
      const cookiesAfterUpdate = await context.cookies();
      const updatedConsent = cookiesAfterUpdate.find(
        (c) => c.name === "OptanonConsent"
      );

      console.log("Updated value:", updatedConsent?.value);
      expect(updatedConsent?.value).toBe("custom_consent_value");
    } else {
      console.warn("OptanonConsent cookie not found!");
      console.log("Available cookies:", cookies.map((c) => c.name).join(", "));
      // Тест не падає, просто попереджаємо
      test.skip(true, "OptanonConsent cookie not found on the page");
    }
  });
});
