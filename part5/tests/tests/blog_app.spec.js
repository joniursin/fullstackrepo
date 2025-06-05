const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
        data: {
            username: 'tester',
            password: 'password',
            name: 'tester name'
        }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('password')
      await page.getByRole('button', {name: 'login'}).click()
      await expect(page.getByText('tester name logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('tester')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', {name: 'login'}).click()

      const error = await page.locator('.error')
      await expect(error).toContainText('wrong username or password')
      await expect(error).toHaveCSS('border-style', 'solid')
      await expect(error).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('tester name logged in')).not.toBeVisible()
    })
  })
})