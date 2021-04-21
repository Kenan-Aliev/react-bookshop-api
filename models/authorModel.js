const {Schema, model} = require('mongoose')

const AuthorSchema = new Schema({
    name: {type: String, required: true, unique: true}
})

module.exports = model('authors',AuthorSchema)