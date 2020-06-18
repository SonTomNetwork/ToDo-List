const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    category: {
        type: String,
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;