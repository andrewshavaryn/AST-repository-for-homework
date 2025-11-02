import test, { expect } from "@playwright/test";
import { sayHiByHour } from "../../hw-with-loops-and-functions/task-2-greetings-by-time";

test("task-2: Граничне значення для доброго ранку", async () => {
  const result = sayHiByHour(11);
  expect(result).toBe("Доброго ранку!");
  console.log(result);
});
