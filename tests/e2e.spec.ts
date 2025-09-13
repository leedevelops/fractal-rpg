import { test, expect } from '@playwright/test'

test('golden path stub', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'New / Continue' }).click()
  await page.getByRole('button', { name: 'Enter Gate' }).click()
  await page.getByRole('button', { name: 'Complete Gate' }).click()
  await expect(page.getByText('Chapter 5')).toBeVisible()
})
