const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, login } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
            username: 'tester',
            password: 'password',
            name: 'tester name'
        }
    })
    await request.post('/api/users', {
        data: {
            username: 'tester2',
            password: 'password',
            name: 'tester name2'
        }
    })
    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'tester', 'password')
      await expect(page.getByText('tester name logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'tester', 'wrong')

      const error = await page.locator('.error')
      await expect(error).toContainText('wrong username or password')
      await expect(error).toHaveCSS('border-style', 'solid')
      await expect(error).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('tester name logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'tester', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'title1', 'author1', 'url1')
        
        await expect(page.locator('.blog').getByText('title1')).toBeVisible()
        await expect(page.locator('.blog').getByText('author1')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'title1', 'author1', 'url1')

      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('likes 1')).toBeVisible()

    })

    test('user who added the blog can delete it', async ({ page }) => {
      await createBlog(page, 'title1', 'author1', 'url1')

      page.on('dialog', async dialog => await dialog.accept())

      await page.getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'remove'}).click()
      await expect(page.locator('.blog').getByText('title1')).not.toBeVisible()
      await expect(page.locator('.blog').getByText('author1')).not.toBeVisible()
    })

    test('user who added the blog only sees the delete button', async ({ page }) => {
      await createBlog(page, 'title1', 'author1', 'url1')

      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByRole('button', {name: 'remove'})).toBeVisible()
      await page.getByRole('button', {name: 'logout'}).click()

      await login(page, 'tester2', 'password')
      await page.getByRole('button', {name: 'view'}).click()
      await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
    })

    test('blogs are arranged in order according to likes', async ({ page }) => {
        await createBlog(page, 'title1', 'author1', 'url1')
        await createBlog(page, 'title2', 'author2', 'url2')

        await expect(page.locator('.blog').first()).toContainText('title1')
        await expect(page.locator('.blog').last()).toContainText('title2')

        await page.getByRole('button', {name: 'view'}).last().click()
        await page.getByRole('button', {name: 'like'}).click()

        await expect(page.locator('.blog').first()).toContainText('title2')
        await expect(page.locator('.blog').last()).toContainText('title1')

    })
  })
})