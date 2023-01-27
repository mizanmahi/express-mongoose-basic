const express = require('express');
const mongoose = require('mongoose');

const todoRouter = require('./routeHandler/todoHandler');

const app = express();
app.use(express.json());

const PORT = process.env.port || 5000;

// connecting db with mongoose
mongoose
   .connect('mongodb://localhost:27017/mizan')
   .then(() => console.log('connected'))
   .catch((err) => {
      console.log(err);
   });

app.get('/', (req, res) => {
   res.json({ message: 'Server is running ..✈' });
});

app.use('/todo', todoRouter);

// error handling middleware
app.use((err, _req, res, _next) => {
   console.log(err);
   res.status(500).json({ err: err.message });
});

app.listen(PORT, () => {
   console.log('Test server running on PORT', PORT);
});
