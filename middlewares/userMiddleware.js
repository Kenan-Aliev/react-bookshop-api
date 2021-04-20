const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(400).json({message: 'Ошибка авторизации'})
        }
        const decode = jwt.verify(token, config.get('secretKey'))
        if (decode.role !== "USER") {
            return res.status(400).json({message: "Отказано в доступе"})
        }
        req.user = decode
        next()
    } catch (err) {
        return res.status(400).json({message: "Неверный токен"})
    }


}