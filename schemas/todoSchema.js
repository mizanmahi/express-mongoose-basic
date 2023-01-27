const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: String,
   status: {
      type: String,
      enum: ['active', 'inactive'],
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

// instance methods
todoSchema.methods.logger = function () {
   // can be implemented in 2 ways, sync and async
};

// static methods
todoSchema.statics = {
   method: function () {
      // here this will refer to the class by which it will be called as it is a static method of that function
      return this.find();
   },
};

// query helper
todoSchema.query = {
    getTodosByName: function(name){
        return this.find({title: new RegExp(name, 'i')})
    }
}

module.exports = todoSchema;
