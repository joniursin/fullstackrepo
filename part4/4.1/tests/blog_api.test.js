const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
})

test('returns the correct amount of blog posts in the JSON format', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(Object.keys(response.body[0])[4], 'id')
})
after(async () => {
    await mongoose.connection.close()
})