import koa from 'koa';
import Router from 'koa-router';
import { feeds } from './controller/fetchController';
import bodyParser from 'koa-bodyparser';
import { middleware } from './middleware/middleware';

const router = new Router();
const app = new koa();
app.use(bodyParser())
router.get("/",middleware, feeds);
// app.listen(3000);
app.use(router.routes()).use(router.allowedMethods());
export {app};