const {Schema, model} = require('mongoose')
const buffer = require("buffer");

const Post = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String},
})

module.exports = model('Post', Post)