import { test as base } from '@playwright/test';

type TestDataFixtures = {
  checkoutInfo: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
  validCheckoutInfo: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
  invalidCheckoutInfo: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
};

export const test = base.extend<TestDataFixtures>({
  checkoutInfo: async ({}, use) => {
    await use({
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    });
  },

  validCheckoutInfo: async ({}, use) => {
    await use({
      firstName: 'Test',
      lastName: 'User',
      postalCode: '54321'
    });
  },

  invalidCheckoutInfo: async ({}, use) => {
    await use({
      firstName: '',
      lastName: '',
      postalCode: ''
    });
  }
});

export { expect } from '@playwright/test';