import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByRole('textbox', { name: 'First Name' }).fill('Andew');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@gma.com');
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('1234512345');
  await page.locator('.subjects-auto-complete__value-container').click();
  await page.locator('#subjectsInput').fill('qa testing');
  await page.getByText('Sports').click();
  await page.getByText('Reading').click();
  await page.getByRole('button', { name: 'Select picture' }).click();
  await page.getByRole('button', { name: 'Select picture' }).setInputFiles('chelsea-fc-logo-png_seeklogo-188885.png');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('test street, 23');
  await page.locator('#state svg').click();
  await page.getByText('Haryana', { exact: true }).click();
  await page.getByText('Select City').click();
  await page.getByText('Panipat', { exact: true }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
});