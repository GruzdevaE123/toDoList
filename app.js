const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

app.get("/api/todos", function (req, res) {

  let content = fs.readFileSync("todos.json", "utf8");
  let todos = JSON.parse(content);
  res.send(todos);
});

app.post("/api/todos", jsonParser, function (req, res) {
  
  if (!req.body) res.sendStatus(400);

  let todoText = req.body.text;
  let todoColor = req.body.color;
  let todo = {text: todoText, color: todoColor};

  let data = fs.readFileSync("todos.json", "utf8");
  let todos = JSON.parse(data);

  let id = Math.max(...todos.map((todo) => todo.id));
  
  if (Number.isFinite(id)) {
    todo.id = id + 1;
  } else {
    todo.id = 1;
  }
  
  todos.push(todo);

  data = JSON.stringify(todos);
  fs.writeFileSync("todos.json", data);
  res.send(todo);
});
app.listen(3000, function() {
  console.log("Server started");
});