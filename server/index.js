const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
require('dotenv').config()

const app = express()
app.use(cors())
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
    .catch(err => res.json(err))
})

app.put('/update/:id',(req, res) => {
    const{id} = req.params;
    TodoModel.findById(id)
    .then(todo => {
        todo.done = !todo.done;
        return todo.save();
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
} )

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
  const task = req.body.task
  TodoModel.create({
    task: task
  }).then(result => res.json(result))
  .catch(err => res.json(err))
})

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`)
})
