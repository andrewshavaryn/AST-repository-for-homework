import test, { expect } from "@playwright/test";

function checkEvenOdd(number: number) { 
  if (isNaN(number) || typeof number !== "number") {
    return "Будь ласка, введи коректне число!";
  } else if (number % 2 === 0) {
    return "Число парне";
  } else {
    return "Число непарне";
  }
}

test("task-1: парне число", async () => {
  const result = checkEvenOdd(4);
  expect(result).toBe("Число парне");
});

test("task-1: непарне число", async () => {
  const result = checkEvenOdd(3);
  expect(result).toBe("Число непарне");
});

test("task-1: невалідне число", async () => {
  const result = checkEvenOdd(NaN);
  expect(result).toBe("Будь ласка, введи коректне число!");
});

test("task-1: дробове число", async () => {
  const result = checkEvenOdd(-2.2);
  expect(result).toBe("Число непарне");
});

test("task-1: нуль це парне число", async () => {
  const result = checkEvenOdd(0);
  expect(result).toBe("Число парне");
});