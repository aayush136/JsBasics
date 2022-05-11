import { Context } from "koa";
import { fetchData } from "../services/fetchServices";
import { getAllBooks } from "../services/getAllBooks";
export const feeds = async (ctx: Context) => {
    try {
        
        const books = await getAllBooks(ctx.state.token);
       
        const data = await fetchData(books, ctx.state.token);
        ctx.status = 200;
        ctx.body = data;
    }
    catch (err: any) {
        ctx.status = err.errStatus || 500;
        ctx.body = err.message;
    }
}