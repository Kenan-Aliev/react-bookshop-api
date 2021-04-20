const {Router} = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('username', 'Username must be longer than 5 symbols').isString().isLength({min: 5}),
        check('password', 'Password must be longer than 7 symbols').isLength({min: 7})
    ],
    async (req, res) => {
        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({message: "Заполните правильно форму", error})
            }
            const {email, username, password} = req.body
            const candidateEmail = await User.findOne({email})
            if (candidateEmail) {
                return res.status(400).json({message: "Пользователь с таким имейлом уже существует"})
            }
            const candidateUsername = await User.findOne({username})
            if (candidateUsername) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 8)
            console.log(hashPassword)
            await new User({
                email, username, password: hashPassword
            }).save()
            return res.status(200).json({
                message: "Вы успешно зарегистрировались"
            })

        } catch (error) {
            return res.status(500).json({message: "server error"})
        }
    }
)


router.post('/authorization', async (req, res) => {
    try {
        const {email, password} = req.body
        const findUser = await User.findOne({email})
        if (!findUser) {
            return res.status(400).json({message: "Неверный email"})
        }
        const comparePassword = bcrypt.compareSync(password, findUser.password)
        if (!comparePassword) {
            return res.status(400).json({message: "Неверный пароль"})
        }

        const token = jwt.sign({id: findUser._id, role: findUser.role}, config.get('secretKey'), {expiresIn: '24h'})
        return res.status(200).json({
            token
        })
    } catch (error) {
        return res.status(500).json({message: "Server error"})
    }

})

module.exports = router


