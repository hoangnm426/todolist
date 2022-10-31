const mongoose = require("mongoose");
const { Schema } = mongoose;

const listTodoSchema = new Schema({
  taskId: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

const ListTodoId = mongoose.model("ListTodoId", listTodoSchema, "ListTodoId");

module.exports = ListTodoId;
