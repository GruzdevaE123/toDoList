const express = require("express");
const app = express();
const todosRouter = require("./routes/todosRouter.js");
app.use(express.static(__dirname + "/public"));
app.use("/api/todos", todosRouter);
app.listen(3000, function() {
  console.log("Server started");
});
