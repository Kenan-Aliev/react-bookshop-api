const {Schema, model} = require('mongoose')

const GenreSchema = new Schema({
    name: {type: String, required: true, unique: true}
})

module.exports = model('genres',GenreSchema)