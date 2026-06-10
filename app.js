const express = require('express')

const app = express()

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('/api/auth', require('./Routes/authRoutes'))

app.use('/api/blogs', require('./Routes/blogRoutes'))

module.exports = app;