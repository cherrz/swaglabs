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
  await page.goto(siteURL); // go to the site
  await page.getByPlaceholder('Username').fill(login); // enter login into field
  await page.getByPlaceholder('Password').fill(passsword); //enter password into field
  await page.locator('#login-button').click(); // click on the submit button
  const productButtons = page.locator('.btn_inventory');//locate all add to card buttons

  for (let i = 0; i < await productButtons.count(); i++) {
    await productButtons.nth(i).click();
  }

  await page.locator('a.shopping_cart_link').click();
  expect(await page.locator('div.cart_item').count()).toBe(6);
});

test('Checkout & finish', async ({ page }) => {
  await page.goto(siteURL); // go to the site
  await page.getByPlaceholder('Username').fill(login); // enter login into field
  await page.getByPlaceholder('Password').fill(passsword); //enter password into field
  await page.locator('#login-button').click(); // click on the submit button
  await expect(page.getByText('Products')).toBeVisible(); // check if the login was successful
  const productButtons = page.locator('.btn_inventory');// locate all add to card buttons

  for (let i = 0; i < await productButtons.count(); i++) { // adding all elements one by one to the cart
    await productButtons.nth(i).click();
  }

  await page.locator('a.shopping_cart_link').click(); // going to the cart
  expect(await page.locator('div.cart_item').count()).toBe(6); //checking if in the cart there are all 6 elements
  await page.locator('#checkout').click(); // go to the checkout
  await page.locator('#first-name').fill('David'); // filling field with name
  await page.locator('#last-name').fill('Testerski'); // filling field with last name
  await page.locator('#postal-code').fill('21-500'); // filling postal code
  await page.locator('#continue').click(); // going further
  await expect(page.locator('.summary_subtotal_label')).toContainText('$129.94'); //checking if the summary is correct
  await page.getByText('Finish').click(); //clicking on finish order
  await expect(page.getByText('Thank you for your order!')).toBeVisible(); //checking if confirmation message is displayed
});