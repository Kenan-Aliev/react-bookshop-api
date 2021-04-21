const {Router} = require('express')
const router = Router()
const adminMiddleware = require('../middlewares/adminMiddleware')
const Author = require('../models/authorModel')

router.post('/add', adminMiddleware, async (req, res) => {
    try {
        const {name} = req.body
        const newAuthor = await new Author({name}).save()
        return res.status(200).json({newAuthor, message: 'Новый автор добавлен'})

    } catch (error) {
        return res.status(500).json({message: "Server error", error})
    }
})

router.get('/getAll', async (req, res) => {
    const authors = await Author.find({})
    return res.status(200).json({authors})
})

module.exports = router