const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;