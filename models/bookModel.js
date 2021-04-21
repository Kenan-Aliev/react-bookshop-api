const {Schema, model, ObjectId} = require('mongoose')

const BookSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    genre: {type: ObjectId, ref: 'genres'},
    pages: {type: Number, required: true},
    author: {type: ObjectId, ref: 'authors'}
})

module.exports = model('books', BookSchema)