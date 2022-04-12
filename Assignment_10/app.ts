import koa from 'koa';
import koaRouter from '@koa/router';
import koaBodyParser from 'koa-bodyparser';
import { Todo,TodoStatus } from './Todo';
import { v4 as uuid } from 'uuid';
const app = new koa();
const todos: Todo[] = new Array();
app.use(koaBodyParser());
const router = new koaRouter();
router.prefix("/todo");
router.get("/", (ctx: koa.ParameterizedContext) => {
    if (ctx.request.querystring) {
        queryResult(ctx);
    }
    else {
        getAllTodos(ctx);
    }
})
router.get("/:id", getTodobyId);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
 function getAllTodos(ctx: koa.Context) {
    if (todos.length === 0) {
        ctx.status = 404;
        ctx.body = "No todos found";
        return;
    }
    ctx.body = todos;
}
 function getTodobyId(ctx: koa.Context) {
    const todo = todos.find((todo) => todo.ID === ctx.params.id);
    if (todo) {
        ctx.status = 200;
        ctx.body = todo;

    }
    else {
        ctx.status = 404;
        ctx.body = "Could not find any todo with given ID"
    }
}
 function deleteTodo(ctx: koa.Context) {
    const id = ctx.params.id;
    const index = todos.findIndex((obj) => obj.ID === id);
    if (index !== -1) {
        todos.splice(index, 1);
        ctx.status = 201;
        ctx.type = "JSON";
        ctx.body = { message: "todoDeleted" }
    }
    else {
        ctx.status = 404;
        ctx.body = "No todo present";
    }
}
function createTodo(ctx: koa.Context) {

    const body = ctx.request.body;
    const ID = uuid();
    const currentTime = new Date().toISOString();
    if (body.status && ![TodoStatus.COMPLETED, TodoStatus.INPROGRESS, TodoStatus.PENDING].includes(body.status)) {
        ctx.status = 406;
        ctx.body = "Not a Valid Status Try these: COMPLETED,INPROGRESS, PENDING "
        return;
    }
    if (!body.title || !body.description) {
        ctx.status = 406;
        ctx.body = "Invalid Input";
        return;
    }
    const todo: Todo = {
        ID: ID,
        createdAt: currentTime,
        description: body.description,
        status: body.status?body.status:"PENDING",
        title: body.title
    }
    todos.push(todo);
    ctx.body = ID;
    ctx.status = 201;
}
 function queryResult(ctx: koa.Context) {
    const query = ctx.query;
    let q = "";
    if (typeof (query.query) === "string") {
        q = query.query;
    }
    else {
        return;
    }
    const searchResult = todos.filter((todo) => todo.title.includes(q));
    if (searchResult.length === 0) {
        ctx.status = 404;
        ctx.body = "No todos found";
    }
    else {
        ctx.status = 201;
        ctx.type = "JSON";
        ctx.body = JSON.stringify(searchResult);
    }
}
 function updateTodo(ctx: koa.Context) {
    const userInput = ctx.request.body;
    const index = todos.findIndex((obj) => obj.ID === ctx.params.id)
    if (index !== -1) {
        if (!userInput.title || !userInput.description) {
            ctx.status = 406;
            ctx.body = "Invalid Input";
            return;
        }
        const todo = todos[index];
        todo.title = userInput.title;
        todo.description = userInput.description;
        if (userInput.status && [TodoStatus.COMPLETED || TodoStatus.INPROGRESS || TodoStatus.PENDING].includes(userInput.status)) {
            todo.status = userInput.status;
        }
        else
        {
            ctx.status = 406;
            ctx.body = "Invalid status";
            return;
        }
        ctx.status = 201;
        ctx.type = "JSON";
        ctx.body = JSON.stringify(todo);
    }
    else {
        ctx.status = 404;
        ctx.body = "Not Found";
        return;
    }
}
app.use(router.routes()).use(router.allowedMethods());
app.listen(3011, () => {
    console.log("server is running");
})