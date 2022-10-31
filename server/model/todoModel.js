const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  listKey: { type: Schema.Types.ObjectId, ref: "ListTodoId" },
  description: String,
  status: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema, "Todos");

module.exports = Todo;
