import http from "http";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import url from "url";
import dotenv from "dotenv";
dotenv.config();
const todos: Todo[] = [];

const Todostatus = {
  INCOMPLETE: "INCOMPLETE",
  INPROGRESS: "INPROGRESS",
  COMPLETED: "COMPLETED",
};

const addTodo = (req: any, res: any) => {
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const { title, description, status } = JSON.parse(body);
    if (status &&!["INCOMPLETE","INPROGRESS","COMPLETED"].includes(status)) {
      res.end("Status not in format. Try one of these: COMPLETED, INCOMPLETE, INPROGRESS");
      return;
    }
    if (!title || !description) {
      res.end("Invalid Input");
      return;
    }
    const ID = uuidv4();
    const todo: Todo = {
      ID,
      title,
      description,
      status: status ? status : Todostatus.INCOMPLETE,
      createdAt: new Date().toISOString(),
      updatedAt:new Date().toISOString()
    };
    todos.push(todo);
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(ID);
  });
};

const getTodo = (req: any, res: any) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(todos));
};

const deleteTodo = (req: any, res: any, id: any) => {
  const index = todos.findIndex((todo) => todo.ID === id);
  if (index === -1) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text");
    res.end("No todo present with the specified ID for deletion.");
    return;
  }
  todos.splice(index, 1);
  res.statusCode = 202;
  res.setHeader("Content-Type", "text");
  res.end("todo deleted");
};

const updateTodo = (req: any, res: any, id: any) => {
  let body = "";
  req.on("data", (chunk: any) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const { title, description, status } = JSON.parse(body);
    const index = todos.findIndex((todo) => id === todo.ID);
    if (index === -1) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text");
      res.end("No todo present with the specified ID for updation.");
      return;
    }
    if (
      status &&
      ![
        Todostatus.COMPLETED,
        Todostatus.INCOMPLETE,
        Todostatus.INPROGRESS,
      ].includes(status)
    ) {
      res.statusCode = 411;
      res.end(
        "Status not in format. Try one of these: Complete, Incomplete, Inprogress"
      );
      return;
    }
    if (!title || !description) {
      res.statusCode = 411;
      res.end("Invalid Input");
      return;
    }
    const todo = todos[index];
    todo.status = status ? status : Todostatus.INCOMPLETE;
    todo.title = title;
    todo.description = description;
    todo.updatedAt=new Date().toISOString()
    res.statusCode = 202;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(todo));
  });
};

const getTodoById = (req: any, res: any, id: any) => {
  const todo = todos.find((todo) => todo.ID === id);
  if (!todo) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text");
    res.end("No todo present with the specified ID.");
    return;
  }
  res.statusCode = 202;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(todo));
};

const queryResult = (req: any, res: any, query: any) => {
  const searchResult = todos.filter((todo) => todo.title.includes(query));
  if (searchResult.length === 0) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text");
    res.end("No todos found with the title including your query.");
    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(searchResult));
};

const server = http.createServer((req: any, res: any) => {
  if (req.method == 'GET' && req.url.split('/')[2]) {
    const parsed = url.parse(req.url, true);
    const query = parsed.query;
    const urlArray = req.url.split("/");
    const id = urlArray[2];
    getTodoById(req, res, id);
  }
  else if (req.method == 'GET' && req.url.includes('/todo')) {
    const parsed = url.parse(req.url, true);
    const query = parsed.query;
    if (query.query) {
      queryResult(req, res, query.query);
    }
    else {
      getTodo(req, res);
    }
  }
  else if (req.method == 'POST') {
    addTodo(req, res);
  }
  else if (req.method == 'PUT') {
    const id = req.url.split("/")[2];
    updateTodo(req, res, id);
  }
  else if (req.method == 'DELETE') {
    const id = req.url.split("/")[2];
    deleteTodo(req, res, id);
  }
  else {
    res.end("wrong endpoint");
  }
});
server.listen(process.env.PORT);
console.log(process.env.PORT);
