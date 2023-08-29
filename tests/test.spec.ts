import { test, expect } from '@playwright/test';

const siteURL = 'https://www.saucedemo.com/';
const login = 'standard_user';
const passsword = 'secret_sauce';

test('Login into the site', async ({ page }) => {
  await page.goto(siteURL); // go to the site
  await page.getByPlaceholder('Username').fill(login); // enter login into field
  await page.getByPlaceholder('Password').fill(passsword); //enter password into field
  await page.locator('#login-button').click(); // click on the submit button
  await expect(page.getByText('Products')).toBeVisible(); //check if the login was successful
});

test('Checking if the all six products are displayed', async ({ page }) => {
  await page.goto(siteURL); // go to the site
  await page.getByPlaceholder('Username').fill(login); // enter login into field
  await page.getByPlaceholder('Password').fill(passsword); //enter password into field
  await page.locator('#login-button').click(); // click on the submit button
  await expect(page.getByText('Products')).toBeVisible(); //check if the login was successful
  expect(await page.locator('.inventory_item').count()).toBe(6); //check if the all 6 prodcuts are visible on the site
});

test('Adding all products to cart', async ({ page }) => {
});

test('Checking sorting options', async ({ page }) => {
});

