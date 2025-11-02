import test, { expect } from "@playwright/test";

import { isEvenNumber } from "./task-1-even-number";

test("task-1: парне число", async () => {
  const result = isEvenNumber(4);
  expect(result).toBe("Число парне");
  console.log(result);
});

test("task-1: непарне число", async () => {
  const result = isEvenNumber(3);
  expect(result).toBe("Число непарне");
  console.log(result);
});

test("task-1: NaN це невалідне число", async () => {
  const result = isEvenNumber(NaN);
  expect(result).toBe("Будь ласка, введи коректне число!");
  console.log(result);
});

test("task-1: дробове число", async () => {
  const result = isEvenNumber(-2.2);
  expect(result).toBe("Число непарне");
  console.log(result);
});

test("task-1: нуль це парне число", async () => {
  const result = isEvenNumber(0);
  expect(result).toBe("Число парне");
  console.log(result);
});
