const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require('./routes/authorRoutes')
const genreRoutes = require('./routes/genreRoutes')

const server = express()
server.use(express.json())
server.use('/api/auth', authRoutes)
server.use('/api/books', bookRoutes)
server.use('/api/genre', genreRoutes)
server.use('/api/author',authorRoutes)

const start = async () => {
    await mongoose.connect(config.get('DBUrl'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    server.listen(config.get('PORT'), () => {
        console.log(`Server started on port ${config.get('PORT')}`)
    })
}

start()
