const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'USER'}
})

module.exports = model('users', UserSchema)