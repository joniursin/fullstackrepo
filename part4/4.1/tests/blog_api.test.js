const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)

    const user = new User({ username: 'tester1', passwordHash: await bcrypt.hash('password1', 10), name: 'tester' })
    await user.save()
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

    const getToken = await api.post('/api/login').send({ username: "tester1", password: "password1" })
    const token = getToken.body.token

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test('blog creation fails when token is not provided', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    }

    await api.post('/api/blogs').send(newBlog).expect(401).expect('Content-Type', /application\/json/)
})

test('likes property missing will default to the value 0', async () => {
    const newBlog = {
        title: "Test blog 2",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
    }

    const getToken = await api.post('/api/login').send({ username: "tester1", password: "password1" })
    const token = getToken.body.token

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const getBlog = response.body.find(blog => blog.title === "Test blog 2")
    assert.strictEqual(getBlog.likes, 0)
})

test('title or url missing responds with the status code 400', async () => {
    const newBlog = {
        author: "Michael Chan",
    }

    const getToken = await api.post('/api/login').send({ username: "tester1", password: "password1" })
    const token = getToken.body.token
    
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
})

test('delete blog succeeds', async () => {
    const getToken = await api.post('/api/login').send({ username: "tester1", password: "password1" })
    const token = getToken.body.token

    const newBlog = {
        title: "Test blog delete",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    }

    const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const blogId = response.body.id

    await api.delete(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${token}`).expect(204)
})

test('delete blog with non-existing id returns status code 400', async () => {
    const getToken = await api.post('/api/login').send({ username: "tester1", password: "password1" })
    const token = getToken.body.token

    await api.delete('/api/blogs/idnotindatabase').set('Authorization', `Bearer ${token}`).expect(400)
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

describe('test user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const user = new User({ username: 'tester1', passwordHash: await bcrypt.hash('password1', 10), name: 'tester' })
        await user.save()
    })

    test('creation succeeds on unique username', async () => {
        const newUser = {
            username: "tester2",
            password: "password2",
            name: "tester"
        }

        const usersBefore = await api.get('/api/users')
        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
        const usersAfter = await api.get('/api/users')
        assert.strictEqual(usersAfter.body.length, usersBefore.body.length + 1)
    })

    test('creation fails on non unique username and returns 400', async () => {
        const newUser = {
            username: "tester1",
            password: "password2",
            name: "tester"
        }

        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    })

    test('creation fails when username less than 3 char returns 400', async () => {
        const newUser = {
            username: "te",
            password: "password2",
            name: "tester"
        }

        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    })

    test('creation fails when password less than 3 char returns 400 and error message', async () => {
        const newUser = {
            username: "tester2",
            password: "pa",
            name: "tester"
        }

        const response = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        assert(response.body.error.includes('password must be at least 3 characters long'))
    })
})

after(async () => {
    await mongoose.connection.close()
})