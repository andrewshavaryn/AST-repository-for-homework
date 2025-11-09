import { test, expect, Page } from "@playwright/test";

const baseURL = "https://demoqa.com/automation-practice-form";

// Типи для тестових даних
type TestData = {
  firstName: string;
  lastName: string;
  email?: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  dateOfBirth?: {
    day: string;
    month: string;
    year: string;
  };
  subjects?: string[];
  hobbies?: string[];
  currentAddress?: string;
  state?: string;
  city?: string;
};

// Набори тестових даних
const testDataSets = [
  {
    testName: "All fields filled",
    data: {
      firstName: "Andrii",
      lastName: "Shavaha",
      email: "andrii.test@gmail.com",
      gender: "Male" as const,
      mobile: "1234567890",
      dateOfBirth: {
        day: "15",
        month: "May",
        year: "1995",
      },
      subjects: ["Maths", "Physics"],
      hobbies: ["Sports", "Reading"],
      currentAddress: "123 Main Street, Uzhhorod",
      state: "Uttar Pradesh",
      city: "Lucknow",
    },
  },
  {
    testName: "Only required fields",
    data: {
      firstName: "Pavlo",
      lastName: "Safonov",
      gender: "Male" as const,
      mobile: "9876543210",
    },
  },
  {
    testName: "Only optional fields with required minimum",
    data: {
      firstName: "Test",
      lastName: "User",
      email: "optional@test.com",
      gender: "Female" as const,
      mobile: "5555555555",
      dateOfBirth: {
        day: "20",
        month: "June",
        year: "2000",
      },
      subjects: ["English"],
      hobbies: ["Music"],
      currentAddress: "Optional Address Street",
      state: "NCR",
      city: "Delhi",
    },
  },
];

// Параметризовані тести
test.describe("REGFORM-0001 Registration Form Tests", { tag: "@smoke" }, () => {
  test.setTimeout(240000); // 4 хвилини на тест

  for (const testSet of testDataSets) {
    test(`Practice Form - ${testSet.testName}`, async ({ page }, testInfo) => {
      testInfo.annotations.push({
        type: "description",
        description: "Positive and negative case for submit the form",
      });

      const data = testSet.data;

      await page.goto(baseURL);

      // ВАЖЛИВО: Чекаємо поки сторінка завантажиться
      await page.waitForLoadState("domcontentloaded");

      // Закрити рекламу і модальні вікна
      await page.evaluate(() => {
        // Видаляємо всі рекламні блоки
        const ads = document.querySelectorAll(
          'ins, iframe[id*="google_ads"], div[id*="ad"], .advertisement, #fixedban'
        );
        ads.forEach((ad) => ad.remove());

        // Видаляємо overlay якщо є
        const overlays = document.querySelectorAll(
          '.modal-backdrop, [class*="overlay"]'
        );
        overlays.forEach((overlay) => overlay.remove());

        // Включаємо скрол якщо він був заблокований
        document.body.style.overflow = "auto";
      });

      // Почекай трохи після видалення реклами
      await page.waitForTimeout(2000);

      // Скролимо до форми
      await page.locator("#firstName").scrollIntoViewIfNeeded();

      // Заповнення обов'язкових полів
      await page.locator("#firstName").fill(data.firstName);
      await page.locator("#lastName").fill(data.lastName);

      // Email (необов'язкове)
      if (data.email) {
        await page.locator("#userEmail").fill(data.email);
      }

      // Gender (обов'язкове)
      const genderLabel = page.locator(
        `label[for="gender-radio-${
          data.gender === "Male" ? "1" : data.gender === "Female" ? "2" : "3"
        }"]`
      );
      await genderLabel.scrollIntoViewIfNeeded();
      await genderLabel.click({ force: true });

      // Mobile (обов'язкове)
      await page.locator("#userNumber").fill(data.mobile);

      // Date of Birth (необов'язкове)
      if (data.dateOfBirth) {
        await page.locator("#dateOfBirthInput").scrollIntoViewIfNeeded();
        await page.locator("#dateOfBirthInput").click();

        await page
          .locator(".react-datepicker__month-select")
          .selectOption(data.dateOfBirth.month);

        await page
          .locator(".react-datepicker__year-select")
          .selectOption(data.dateOfBirth.year);

        await page
          .locator(
            `.react-datepicker__day--0${data.dateOfBirth.day}:not(.react-datepicker__day--outside-month)`
          )
          .first()
          .click();
      }

      // Subjects (необов'язкове)
      if (data.subjects && data.subjects.length > 0) {
        await page.locator("#subjectsInput").scrollIntoViewIfNeeded();
        for (const subject of data.subjects) {
          await page.locator("#subjectsInput").fill(subject);
          await page.keyboard.press("Enter");
          await page.waitForTimeout(300);
        }
      }

      // Hobbies (необов'язкове)
      if (data.hobbies && data.hobbies.length > 0) {
        for (const hobby of data.hobbies) {
          const hobbyLabel = page.locator(
            `label[for="hobbies-checkbox-${
              hobby === "Sports" ? "1" : hobby === "Reading" ? "2" : "3"
            }"]`
          );
          await hobbyLabel.scrollIntoViewIfNeeded();
          await hobbyLabel.click({ force: true });
        }
      }

      // Current Address (необов'язкове)
      if (data.currentAddress) {
        await page.locator("#currentAddress").scrollIntoViewIfNeeded();
        await page.locator("#currentAddress").fill(data.currentAddress);
      }

      // State and City (необов'язкові) - ЯК В РЕКОРДЕРІ
      // Точно як в рекордері - клік по SVG
      if (data.state) {
        await page.locator("#state svg").click();
        await page.waitForTimeout(1000);

        // Вибір опції по тексту з exact: true
        await page.getByText(data.state, { exact: true }).click();
        await page.waitForTimeout(500);
      }

      if (data.city) {
        await page.locator("#city").scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // Точно як в рекордері - клік по SVG
        await page.locator("#city svg").click();
        await page.waitForTimeout(1000);

        // Вибір опції по тексту з exact: true
        await page.getByText(data.city, { exact: true }).click();
        await page.waitForTimeout(500);
      }

      // Submit форми
      await page.locator("#submit").scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.locator("#submit").click({ force: true });

      // Перевірка що модальне вікно з'явилося
      await expect(page.locator("#example-modal-sizes-title-lg")).toBeVisible({
        timeout: 15000,
      });
      await expect(page.locator("#example-modal-sizes-title-lg")).toHaveText(
        "Thanks for submitting the form"
      );

      // Перевірка даних у модальному вікні
      const modalTable = page.locator(".table");

      // Перевірка обов'язкових полів
      await expect(
        modalTable
          .locator("td")
          .filter({ hasText: `${data.firstName} ${data.lastName}` })
      ).toBeVisible();
      await expect(
        modalTable.locator("td").filter({ hasText: data.mobile })
      ).toBeVisible();
      await expect(
        modalTable.locator("td").filter({ hasText: data.gender })
      ).toBeVisible();

      // Перевірка необов'язкових полів якщо вони були заповнені
      if (data.email) {
        await expect(
          modalTable.locator("td").filter({ hasText: data.email })
        ).toBeVisible();
      }

      if (data.currentAddress) {
        await expect(
          modalTable.locator("td").filter({ hasText: data.currentAddress })
        ).toBeVisible();
      }

      // Закрити модальне вікно
      await page.locator("#closeLargeModal").click();
    });
  }
});
