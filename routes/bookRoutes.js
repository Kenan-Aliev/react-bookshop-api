const {Router} = require('express')
const router = Router()
const Book = require('../models/bookModel')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.post('/add', adminMiddleware, async (req, res) => {
    try {
        const {title, price, pages, author, genre} = req.body
        if (!title || !pages || !price || !author || !genre) {
            return res.status(400).json({message: "Укажите название,цену,количество страниц,жанр и автора книги"})
        }
        const newBook = await new Book({title, price, pages, author, genre}).save()
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


router.get('/getByAuthorId/:id', async (req, res) => {
    const books = await Book.find({author: req.params.id})
    return res.status(200).json({books})
})


router.get('/getByGenreId/:id', async (req, res) => {
    const books = await Book.find({genre: req.params.id})
    return res.status(200).json({books})
})


router.get('/getBook/:id', async (req, res) => {
    const book = await Book.findOne({_id:req.params.id})
    return res.json({book})
})

module.exports = router