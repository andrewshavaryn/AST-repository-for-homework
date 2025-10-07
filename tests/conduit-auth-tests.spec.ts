import { test, expect } from '@playwright/test';


test(
  "AUTH-0001 Log in with valid email credentials",
   {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Log in with valid credentials",
    },
  },

  //Navigate to login page
  async ({ page }) => {
  await page.goto('https://demo.learnwebdriverio.com/login');

  //Fill in valid credentials
  await page.getByRole('textbox', { name: 'Email' }).fill('test31@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('test1234');

  //Press "Sign In" buttom
  await page.getByRole('button', { name: 'Sign in' }).click();

  //Verify that User is logged in
  await expect(page.getByRole('navigation').filter({ hasText: 'conduit Home New Article' })).toBeVisible();
});