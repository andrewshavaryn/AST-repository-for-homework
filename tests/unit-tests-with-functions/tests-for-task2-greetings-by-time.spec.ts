import test, { expect } from "@playwright/test";
import { sayHiByHour } from "../../hw-with-loops-and-functions/task-2-greetings-by-time";

test("test-1 for task-2: нижнє граничне значення для Доброго ранку", async () => {
  const result = sayHiByHour(0);
  expect(result).toBe("Доброго ранку!");
  console.log(result);
});

test("test-2 for task-2: верхнє граничне значення для Доброго ранку", async () => {
  const result = sayHiByHour(11);
  expect(result).toBe("Доброго ранку!");
  console.log(result);
});

test("test-3 for task-2: нижнє граничне значення для Доброго дня", async () => {
  const result = sayHiByHour(12);
  expect(result).toBe("Доброго дня!");
  console.log(result);
});

test("test-4 for task-2: верхнє граничне значення для Доброго дня", async () => {
  const result = sayHiByHour(18);
  expect(result).toBe("Доброго дня!");
  console.log(result);
});

test("test-5 for task-2: нижнє граничне значення для Доброго вечора", async () => {
  const result = sayHiByHour(19);
  expect(result).toBe("Доброго вечора!");
  console.log(result);
});

test("test-6 for task-2: верхнє граничне значення для Доброго вечора", async () => {
  const result = sayHiByHour(23);
  expect(result).toBe("Доброго вечора!");
  console.log(result);
});

test("test-7 for task-2: невалідне значення за верхньою межею", async () => {
  const result = sayHiByHour(24);
  expect(result).toBe("Будь ласка, введи час в діапазоні з 00:00 до 23:59!");
  console.log(result);
});

test("test-8 for task-2: невалідне значення за нижнею межею", async () => {
  const result = sayHiByHour(-1);
  expect(result).toBe("Будь ласка, введи час в діапазоні з 00:00 до 23:59!");
  console.log(result);
});

test("test-9 for task-2: невалідний тип даних(NaN)", async () => {
  const result = sayHiByHour(NaN);
  expect(result).toBe("Будь ласка, введи коректний час!");
  console.log(result);
});
