const config = require('./utils/config')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
