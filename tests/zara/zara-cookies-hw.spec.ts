import { test, expect } from "@playwright/test";

test("Cookies-0001 - Work with specific cookie - OptanonConsent", async ({
  page,
  context,
}) => {
  await page.goto("/");

  const cookieButton = page.getByRole("button", {
    name: /ПРИЙНЯТИ ВСІ ФАЙЛИ COOKIE|Accept All Cookies/i,
  });
  await cookieButton.waitFor({ state: "visible" });
  await cookieButton.click();

  const cookies = await context.cookies();
  console.log("Усі cookies:", cookies.map((c) => c.name).join(", "));

  const consentCookie = cookies.find((c) => c.name === "OptanonConsent");

  if (consentCookie) {
    console.log("OptanonConsent cookie знайдено");
    console.log("Оригінальне значення:", consentCookie.value);

    const updatedCookies = cookies.map((cookie) => {
      if (cookie.name === "OptanonConsent") {
        cookie.value = "custom_consent_value";
      }
      return cookie;
    });

    await context.clearCookies();
    await context.addCookies(updatedCookies);

    const cookiesAfterUpdate = await context.cookies();
    const updatedConsent = cookiesAfterUpdate.find(
      (c) => c.name === "OptanonConsent"
    );

    console.log("Оновлене значення:", updatedConsent?.value);
    expect(updatedConsent?.value).toBe("custom_consent_value");
  } else {
    console.warn("OptanonConsent cookie не знайдено!");
    test.skip(true, "OptanonConsent cookie не знайдено на сторінці");
  }
});
