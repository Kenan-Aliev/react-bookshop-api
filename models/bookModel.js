const { Schema, model} = require('mongoose')

const BookSchema = new Schema({
    title:{type:String,required:true},
    author:{type:String,required:true}
})

module.exports = model('books',BookSchema)