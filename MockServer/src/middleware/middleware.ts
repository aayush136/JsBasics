import koa from 'koa';
import { fetchError } from '../error/fetchError';
export function middleware(ctx: koa.Context, next: any) {

    const { authorization = '' } = ctx.request.headers;
    const token = authorization.split(' ')[1];
    if(!token)
    {
        throw new fetchError('token not found',404);
    }
    ctx.state.token = token;
    return new Promise((resolve, reject) => {
        next().then(resolve).catch(reject);
    })
}