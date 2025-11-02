import test, { expect } from "@playwright/test";
import { sayHiByHour } from "../../hw-with-loops-and-functions/task-2-greetings-by-time";

test("task-2: верхнє граничне значення для Доброго ранку", async () => {
  const result = sayHiByHour(11);
  expect(result).toBe("Доброго ранку!");
  console.log(result);
});


test("task-2: нижнє граничне значення для Доброго дня", async () => {
  const result = sayHiByHour(12);
  expect(result).toBe("Доброго дня!");
  console.log(result);
});


test("task-2: верхнє граничне значення для Доброго дня", async () => {
  const result = sayHiByHour(18);
  expect(result).toBe("Доброго дня!");
  console.log(result);
});


test("task-2: нижнє граничне значення для Доброго вечора", async () => {
  const result = sayHiByHour(19);
  expect(result).toBe("Доброго вечора!");
  console.log(result);
});
