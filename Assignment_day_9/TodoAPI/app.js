const http = require("http");
const Todo = require("./Todo");
require("dotenv").config();

const todos = [];

const createTodo = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    console.log(chunk)
    body += chunk.toString();
  });

  req.on("end", () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    body = JSON.parse(body);
    const todo = new Todo(body.title, body.task);
    todos.push(todo);
    console.log(todos);
    res.end("todo created");
  });
};

const getTodo = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(todos));
};

const removeTodo = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    body = JSON.parse(body);
    todos.splice(todos.findIndex(todo => body.title ===todo.title),1);
    console.log(todos);
    res.end("todo removed");
  });
};

const editTodo = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    body = JSON.parse(body);
    const index = todos.findIndex( todo => body.title ===todo.title);
    todos[index] = new Todo(body.title,body.newTask);
    console.log(todos);
    res.end("todo Edited");
  });
};

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/createTodo") {
    createTodo(req, res);
  } else if (req.method === "GET" && req.url === "/") {
    getTodo(req, res);
  } else if (req.method === "DELETE" && req.url === "/removeTodo") {
    removeTodo(req, res);
  } else if (req.method === "PATCH" && req.url === "/editTodo") {
    editTodo(req, res);
  } else {
    res.end("wrong");
  }
});

server.listen(process.env.PORT);