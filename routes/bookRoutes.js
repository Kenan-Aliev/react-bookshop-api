const {Router} = require('express')
const router = Router()
const Book = require('../models/bookModel')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.post('/add', adminMiddleware, async (req, res) => {
    try {
        const {title, author} = req.body
        if (!title || !author) {
            return res.status(400).json({message: "Укажите название и автора книги"})
        }
        const newBook = await new Book({title, author}).save()
        return res.status(200).json({
            newBook,
            message: "Новая книга добавлена"
        })
    } catch (error) {
        return res.status(500).json({message: "Server error", error})
    }

})

router.get('/getAll', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({books})
    } catch (error) {
        return res.status(500).json({message: "Server error", error})

    }
})

module.exports = router