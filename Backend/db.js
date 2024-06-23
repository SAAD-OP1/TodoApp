const mongoose = require('mongoose');

mongoose.connect('enter your own mongodb cluster connection string')

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = new mongoose.model('todo', todoSchema);
module.exports = {
    todo
}