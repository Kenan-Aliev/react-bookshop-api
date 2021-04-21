const {Router} = require('express')
const router = Router()
const adminMiddleware = require('../middlewares/adminMiddleware')
const Genre = require('../models/genreModel')

router.post('/add', adminMiddleware, async (req, res) => {
    try {
        const {name} = req.body
        const newGenre = await new Genre({name}).save()
        return res.status(200).json({newGenre, message: 'Новый жанр добавлен'})

    } catch (error) {
        return res.status(500).json({message: "Server error", error})
    }
})

router.get('/getAll', async (req, res) => {
    const genres = await Genre.find({})
    return res.status(200).json({genres})
})

module.exports = router