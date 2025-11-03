import {test, expect } from "@playwright/test";
import { isAgeForElections } from "../../hw-with-loops-and-functions/task-4-age-elections";

test("test-1 for task-4: верхнє граничне значення для людей, які ще не мають права голосувати", async () => {
  const result = isAgeForElections(17);
  expect(result).toBe("Ви ще не можете голосувати");
});

test("test-2 for task-4: нижнє граничне значення для людей, які вже мають права голосувати", async () => {
  const result = isAgeForElections(18);
  expect(result).toBe("Ви можете голосувати");
});

test("test-3 for task-4: нижнє граничне значення для людей, які вже мають права голосувати + 1", async () => {
  const result = isAgeForElections(19);
  expect(result).toBe("Ви можете голосувати");
});

test("test-4 for task-4: нижнє граничне значення для людей, які вже не мають права голосувати", async () => {
  const result = isAgeForElections(0);
  expect(result).toBe("Ви ще не можете голосувати");
});

test("test-5 for task-4: невалідне (від'ємне значення) для людського віку", async () => {
  const result = isAgeForElections(-1);
  expect(result).toBe("Invalid age: should be not less than 0");
});

test("test-6 for task-4: невалідний тип даних", async () => {
  const result = isAgeForElections(NaN);
  expect(result).toBe("Invalid age, please enter age as a Number");
});
