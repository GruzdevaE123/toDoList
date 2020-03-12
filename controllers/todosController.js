const fs = require("fs");

exports.getTodos = function(req, res) {
  let content = fs.readFileSync("todos.json", "utf8");
  let todos = JSON.parse(content);
  res.send(todos);
};
exports.postTodos = function(req, res) {
  if (!req.body) res.sendStatus(400);

  let todoText = req.body.text;
  let todoColor = req.body.color;
  let todo = { text: todoText, color: todoColor };

  let data = fs.readFileSync("todos.json", "utf8");
  let todos = JSON.parse(data);

  let id = Math.max(...todos.map(todo => todo.id));

  if (Number.isFinite(id)) {
    todo.id = id + 1;
  } else {
    todo.id = 1;
  }

  todos.push(todo);

  data = JSON.stringify(todos);
  fs.writeFileSync("todos.json", data);
  res.send(todo);
};
