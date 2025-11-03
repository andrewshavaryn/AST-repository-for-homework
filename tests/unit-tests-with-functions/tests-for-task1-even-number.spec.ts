import  {test, expect } from "@playwright/test";
import { isEvenNumber } from "../../hw-with-loops-and-functions/task-1-even-number";

test("test-1 for task-1: парне число", async () => {
  const result = isEvenNumber(4);
  expect(result).toBe("Число парне");
});

test("test-2 task-1: непарне число", async () => {
  const result = isEvenNumber(3);
  expect(result).toBe("Число непарне");
});

test("test-3 for task-1: NaN це невалідне число", async () => {
  const result = isEvenNumber(NaN);
  expect(result).toBe("Будь ласка, введи коректне число!");
});

test("test-4 for task-1: дробове число", async () => {
  const result = isEvenNumber(-2.2);
  expect(result).toBe("Число непарне");
});

test("test-5 for task-1: нуль це парне число", async () => {
  const result = isEvenNumber(0);
  expect(result).toBe("Число парне");
});
