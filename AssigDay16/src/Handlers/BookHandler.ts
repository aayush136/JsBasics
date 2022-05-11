import koa from 'koa';
import { Books } from '../Constant/data';
import { bookValidations } from '../validations/validations';
import { createBookHelper, deleteBookHelper, getBookByBookIdHelper, getBookByUserIdHelper,searchBookByTitle, updateBookHelper } from '../services/bookServices';
import { Ibook } from '../Constant/interface';
export function createBook(ctx: koa.Context) {
    const body = ctx.request.body;
    const { user } = ctx.state.payLoad;
    try {
        bookValidations(ctx);
        const id = createBookHelper(body, user, ctx);
        ctx.body = id;
        ctx.status = 201;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function getBookByBookId(ctx: koa.Context) {
    try {
        const book = getBookByBookIdHelper(ctx.params.id);
        ctx.status = 200;
        ctx.body = book;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function getBookByUserId(ctx: koa.Context) {
    const user= ctx.params.id;
    try {
        const books = getBookByUserIdHelper(user);
        ctx.body = books;
        ctx.status = 200;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function updateBook(ctx: koa.Context) {
    const userBody = ctx.request.body;
    try {
        const updateBookId = updateBookHelper(ctx.params.id, userBody);
        ctx.status = 200;
        ctx.body = updateBookId;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
        return;
    }
}

export function deleteBook(ctx: koa.Context) {
    const id = ctx.params.id;
    const { user } = ctx.state.payLoad;
    try {
        const deleteBookArray = deleteBookHelper(id, user);
        ctx.status = 200;
        ctx.body = deleteBookArray;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function getAllBooks(ctx: any) {
    const { limit = "2" } = ctx.request.query;
    const range:number = parseInt(limit);
    let counter = 0;
    let books: Ibook[] = [];
    for(const book of Books) {
        if(counter===range) break;
        books.push(book);
        counter++;
    }
     ctx.status=200;
    ctx.body = books;
}
export function searchByBookTitle(ctx: koa.Context) {
    try {
        const { title = '' } = ctx.request.query;
        const filtered = searchBookByTitle(title);
        ctx.status = 200;
        ctx.body = filtered;
    }
    catch (err: any) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}