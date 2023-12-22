const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const todoController = require('./controllers/todoController');

const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://masumr111:eJe7JyUoOrbnq8b8@cluster0.ajkw5in.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/todos', todoController.getAllTodos);
app.get('/todos/:id', todoController.getTodoById);
app.post('/todos', todoController.createTodo);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);
app.put("/todos/:id/complete", todoController.completeTodo);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
