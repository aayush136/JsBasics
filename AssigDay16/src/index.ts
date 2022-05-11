import koa, { Context } from 'koa';
import userRouter from './Routes/userRoutes';
import bookRouter from './Routes/bookRoutes';
import reviewRouter from './Routes/reviewRoutes';
import bodyParser from 'koa-bodyparser';
 const app = new koa();

app.use(bodyParser());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(bookRouter.routes()).use(bookRouter.allowedMethods());
app.use(reviewRouter.routes()).use(reviewRouter.allowedMethods());

export {app}

