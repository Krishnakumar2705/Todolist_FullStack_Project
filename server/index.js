const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
require('dotenv').config()

const app = express()
app.use(cors({
  origin: ['https://todolist-frontend-tbry.onrender.com', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo'

console.log('Connecting to MongoDB...')
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => {
        console.error('Error fetching todos:', err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    })
})

app.put('/update/:id',(req, res) => {
    const{id} = req.params;
    TodoModel.findById(id)
    .then(todo => {
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.done = !todo.done;
        return todo.save();
    })
    .then(result => res.json(result))
    .catch(err => {
        console.error('Error updating todo:', err);
        res.status(500).json({ error: 'Failed to update todo' });
    })
} )

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => {
        console.error('Error deleting todo:', err);
        res.status(500).json({ error: 'Failed to delete todo' });
    })
})

app.post('/add', (req, res) => {
  const task = req.body.task
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  TodoModel.create({
    task: task,
    done: false
  }).then(result => res.json(result))
  .catch(err => {
    console.error('Error adding todo:', err);
    res.status(500).json({ error: 'Failed to add todo' });
  })
})

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`)
})
