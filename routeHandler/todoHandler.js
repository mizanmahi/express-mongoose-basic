const express = require('express');
const { default: mongoose } = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const todoRouter = express.Router();

const Todo = new mongoose.model('Todo', todoSchema);
console.log(Todo);

// Get todos by name, custom query helper

todoRouter.get('/byName/:name', async (req, res) => {
   const result = await Todo.find({}).getTodosByName(req.params.name);
   res.json(result);
});

// GET all todos
todoRouter.get('/', async (req, res) => {
   const result = await Todo.find({});
   res.json(result);
});

// GET a single todo by id
todoRouter.get('/:id', async (req, res) => {
   const result = await Todo.findOne({ _id: req.params.id });
   res.json(result);
});

// POST a single todo
todoRouter.post('/', async (req, res) => {
   const newTodo = new Todo(req.body);
   newTodo.logger()
   await newTodo.save((err) => {
      if (err) {
         res.status(500).json({ err: 'Something went wrong on server side' });
      } else {
         res.status(200).json({ message: 'Todo was inserted successfully' });
      }
   });

   /*    const result = await Todo.insertOne(req.body);
   res.json(result); */
});

// POST multiple todos
todoRouter.post('/all', async (req, res) => {
   Todo.insertMany([...req.body], (err) => {
      if (err) {
         res.status(500).json({ err: 'Something went wrong on server side' });
      } else {
         res.status(200).json({ message: 'Todos ware inserted successfully' });
      }
   });
});

// PUT : UPDATE a todo
todoRouter.put('/:id', async (req, res) => {
   await Todo.updateOne(
      { _id: req.params.id },
      {
         $set: {
            status: 'active',
         },
      },
      (err) => {
         if (err) {
            res.status(500).json({
               err: err.message,
            });
         } else {
            res.status(200).json({
               message: `Todo with id ${req.params.id}  was updated successfully`,
            });
         }
      }
   );
});

// DELETE a todo
todoRouter.delete('/:id', async (req, res) => {
   const result = await Todo.deleteOne({ id: req.params.id });
   res.json(result);
});

module.exports = todoRouter;
