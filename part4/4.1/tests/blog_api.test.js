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
    assert.strictEqual('id' in response.body[0], true)
})

test('successfully creates a new blog post', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test('likes property missing will default to the value 0', async () => {
    const newBlog = {
        title: "Test blog 2",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const getBlog = response.body.find(blog => blog.title === "Test blog 2")
    assert.strictEqual(getBlog.likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})