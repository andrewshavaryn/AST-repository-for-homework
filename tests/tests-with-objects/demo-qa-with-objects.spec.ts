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
      state: "NCR",
      city: "Delhi",
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
      state: "Uttar Pradesh",
      city: "Agra",
    },
  },
];

// Обгортаємо всі тести в describe з тегом
test.describe("REGFORM-0001 Registration Form Tests", { tag: "@smoke" }, () => {
  
  for (const testSet of testDataSets) {
    test(`Practice Form - ${testSet.testName}`, async ({ page }, testInfo) => {
      // Додаємо annotation
      testInfo.annotations.push({
        type: "description",
        description: "Positive and negative case for submit the form",
      });

      const data = testSet.data;

      await page.goto(baseURL);

      // Закрити рекламу/банери якщо є
      await page.evaluate(() => {
        const ads = document.querySelectorAll('ins, iframe[id*="google_ads"]');
        ads.forEach((ad) => ad.remove());
      });

      // Заповнення обов'язкових полів
      await page.locator("#firstName").fill(data.firstName);
      await page.locator("#lastName").fill(data.lastName);

      // Email (необов'язкове)
      if (data.email) {
        await page.locator("#userEmail").fill(data.email);
      }

      // Gender (обов'язкове)
      await page
        .locator(
          `label[for="gender-radio-${data.gender === "Male" ? "1" : data.gender === "Female" ? "2" : "3"}"]`
        )
        .click();

      // Mobile (обов'язкове)
      await page.locator("#userNumber").fill(data.mobile);

      // Date of Birth (необов'язкове)
      if (data.dateOfBirth) {
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
        for (const subject of data.subjects) {
          await page.locator("#subjectsInput").fill(subject);
          await page.keyboard.press("Enter");
        }
      }

      // Hobbies (необов'язкове)
      if (data.hobbies && data.hobbies.length > 0) {
        for (const hobby of data.hobbies) {
          await page
            .locator(
              `label[for="hobbies-checkbox-${hobby === "Sports" ? "1" : hobby === "Reading" ? "2" : "3"}"]`
            )
            .click();
        }
      }

      // Current Address (необов'язкове)
      if (data.currentAddress) {
        await page.locator("#currentAddress").fill(data.currentAddress);
      }

      // State and City (необов'язкові)
      if (data.state) {
        await page.locator("#state").click();
        await page.locator(`text=${data.state}`).click();
      }

      if (data.city) {
        await page.locator("#city").click();
        await page.locator(`text=${data.city}`).click();
      }

      // Submit форми
      await page.locator("#submit").click();

      // Перевірка що модальне вікно з'явилося
      await expect(page.locator("#example-modal-sizes-title-lg")).toBeVisible();
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