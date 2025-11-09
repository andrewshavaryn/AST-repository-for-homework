import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByRole('textbox', { name: 'First Name' }).fill('Andrew');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@gmail.com');
  await page.getByRole('radio', { name: 'Other' }).press('1');
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('1234512345');
  await page.locator('.subjects-auto-complete__value-container').click();
  await page.locator('#subjectsInput').fill('testing');
  await page.getByText('Reading').click();
  await page.getByRole('textbox', { name: 'Current Address' }).click();
  await page.getByRole('checkbox', { name: 'Reading' }).press('t');
  await page.getByRole('checkbox', { name: 'Reading' }).press('e');
  await page.getByRole('checkbox', { name: 'Reading' }).press('s');
  await page.getByRole('checkbox', { name: 'Reading' }).press('t');
  await page.getByRole('checkbox', { name: 'Reading' }).press('i');
  await page.getByRole('checkbox', { name: 'Reading' }).press('n');
  await page.getByRole('checkbox', { name: 'Reading' }).press('g');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('test str., 91');
  await page.locator('#state svg').click();
  await page.getByText('Uttar Pradesh', { exact: true }).click();
  await page.locator('#city svg').click();
  await page.getByText('Lucknow', { exact: true }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Thanks for submitting the form')).toBeVisible();
});