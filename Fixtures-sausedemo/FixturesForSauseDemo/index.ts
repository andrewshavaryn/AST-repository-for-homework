import { test as base } from '@playwright/test';
import { test as pagesTest } from './pages.fixture';
import { test as authTest } from './auth.fixture';
import { test as cartTest } from './cart.fixture';
import { test as testDataTest } from './testData.fixture';

// Об'єднуємо всі фікстури в один test об'єкт
export const test = base
  .extend(pagesTest)
  .extend(authTest)
  .extend(cartTest)
  .extend(testDataTest);

export { expect } from '@playwright/test';