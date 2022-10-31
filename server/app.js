const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./router/todoRouter");
const app = express();
// Default database link
const URI = "mongodb://localhost:27017/mydb";
// Default PORT
const PORT = process.env.PORT || 8080;

// Connect to Mongodb
mongoose.connect(URI, { useNewUrlParser: true }).then(() => {
  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
    );
    next();
  });
  app.use("/api/todos", todoRouter);
  app.listen(PORT, console.log(`Listen to ${PORT}`));
});
