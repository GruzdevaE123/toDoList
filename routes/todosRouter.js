const express = require("express");
const todosController = require("../controllers/todosController.js");
const todosRouter = express.Router();
const jsonParser = express.json();

todosRouter.post("/add", jsonParser, todosController.postTodos);
todosRouter.get("/", todosController.getTodos);

module.exports = todosRouter;
