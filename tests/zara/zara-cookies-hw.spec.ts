import { test, expect } from "@playwright/test";

test.describe("Zara Cookies Tests", () => {
  test("Cookies-0001 - Accept cookies, verify count and modify cookie value", async ({
    page,
    context,
  }) => {
    // 1. Відкриваємо сайт
    await page.goto("https://www.zara.com/es/en/");

    // 2. Погоджуємось на всі cookies
    // Чекаємо появи cookie banner і клікаємо "Accept All"
    await page.getByRole("button", { name: "Accept All Cookies" }).click();
    await page.getByRole("button", { name: "Yes, continue on Spain" }).click();

    // 3. Отримуємо всі cookies і перевіряємо їх кількість
    const allCookies = await context.cookies();
    console.log(`Total cookies count: ${allCookies.length}`);
    console.log(
      "Cookies:",
      allCookies.map((c) => c.name)
    );

    // Перевіряємо, що cookies встановлені (більше 0)
    expect(allCookies.length).toBeGreaterThan(0);

    // 4. Змінюємо будь-який cookie на будь-яке значення
    // Візьмемо перший cookie і змінимо його значення
    if (allCookies.length > 0) {
      const cookieToModify = allCookies[0];
      console.log(`Modifying cookie: ${cookieToModify.name}`);
      console.log(`Original value: ${cookieToModify.value}`);

      // Створюємо модифікований cookie
      const modifiedCookie = {
        ...cookieToModify,
        value: "modified_test_value_12345",
      };

      // Спочатку видаляємо старий cookie
      await context.clearCookies({ name: cookieToModify.name });

      // Додаємо модифікований cookie
      await context.addCookies([modifiedCookie]);

      // Перевіряємо, що cookie змінився
      const updatedCookies = await context.cookies();
      const updatedCookie = updatedCookies.find(
        (c) => c.name === cookieToModify.name
      );

      console.log(`New value: ${updatedCookie?.value}`);
      expect(updatedCookie?.value).toBe("modified_test_value_12345");
    }
  });

  test("Work with specific cookie - OptanonConsent", async ({
    page,
    context,
  }) => {
    await page.goto("https://www.zara.com/es/en/");
    await page.getByRole("button", { name: "Accept All Cookies" }).click();
    await page.getByRole("button", { name: "Yes, continue on Spain" }).click();

    // Приймаємо cookies
    await page.getByRole("button", { name: "Accept All Cookies" }).click();
    await page.getByRole("button", { name: "Yes, continue on Spain" }).click();

    // Шукаємо конкретний cookie (наприклад, OptanonConsent)
    const cookies = await context.cookies();
    const consentCookie = cookies.find((c) => c.name === "OptanonConsent");

    if (consentCookie) {
      console.log("OptanonConsent cookie found:", consentCookie.value);

      // Змінюємо його значення
      await context.clearCookies({ name: "OptanonConsent" });
      await context.addCookies([
        {
          ...consentCookie,
          value: "custom_consent_value",
        },
      ]);

      // Перевіряємо зміну
      const updatedCookies = await context.cookies();
      const updatedConsent = updatedCookies.find(
        (c) => c.name === "OptanonConsent"
      );
      expect(updatedConsent?.value).toBe("custom_consent_value");
    }
  });
});
