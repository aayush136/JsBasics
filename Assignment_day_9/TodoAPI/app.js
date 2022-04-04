const http = require("http");
const Todo = require("./Todo");
require("dotenv").config();

const todos = [];

const addTodo = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    body = JSON.parse(body);
    const todo = new Todo(body.title, body.task);
    todos.push(todo);
    console.log(todos);
    res.end("todo added");
  });
};

const getTodo = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(todos));
};

const deleteTodo = (req, res) => {
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
    res.end("todo deleted");
  });
};

const updateTodo = (req, res) => {
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
    res.end("todo updated");
  });
};

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/addTodo") {
    addTodo(req, res);
  } else if (req.method === "GET" && req.url === "/") {
    getTodo(req, res);
  } else if (req.method === "DELETE" && req.url === "/deleteTodo") {
    deleteTodo(req, res);
  } else if (req.method === "PATCH" && req.url === "/updateTodo") {
    updateTodo(req, res);
  } else {
    res.end("wrong endpoint");
  }
});

server.listen(process.env.PORT);