import jsonwebtoken from "jsonwebtoken";
import koa from 'koa';
import { secretKey } from "../Constant/data";
import  { authError } from "../Error/myError";

function verify(ctx: koa.Context, next: any) {
    const { authorization = '' } = ctx.request.headers;
    const token = authorization.split(' ')[1];
    console.log("token ",token)
    try {
        jsonwebtoken.verify(token, secretKey, (err: any, data: any) => {
            if (err) {
                throw new authError(err, 401);
            }
            else {
                ctx.state.payLoad = data;
                next();
            }
        })
    }
    catch (err: any) {
        console.log("hello")
        ctx.body = err.message;
        ctx.status = err.statusCode;
    }
}
export default verify;