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

test('title or url missing responds with the status code 400', async () => {
    const newBlog = {
        author: "Michael Chan",
    }
    
    await api.post('/api/blogs').send(newBlog).expect(400)
})

test('delete blog succeeds', async () => {
    await api.delete('/api/blogs/5a422a851b54a676234d17f7').expect(204)
})

test('delete blog with non-existing id returns status code 400', async () => {
    await api.delete('/api/blogs/idnotindatabase').expect(400)
})

test('update blog succeeds', async () => {
    const newBlog = {
        title: "Test blog 3",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 10
    }

    await api.put('/api/blogs/5a422a851b54a676234d17f7').send(newBlog).expect(200)
    const response = await api.get('/api/blogs')
    const getBlog = response.body.find(blog => blog.title === "Test blog 3")
    assert.strictEqual(getBlog.title, "Test blog 3")
})

test('update blog with non-existing id returns status code 400', async () => {
    const newBlog = {
        title: "Test blog 4",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 10
    }

    await api.put('/api/blogs/idnotindatabase').send(newBlog).expect(400)
})

after(async () => {
    await mongoose.connection.close()
})