import { v4 as uuid } from 'uuid';
import { Users } from '../Constant/data';
import { authError, mandatoryFieldError, notFoundError } from '../Error/myError';
import { Ibook } from '../Constant/interface';
import { Books } from '../Constant/data';
import koa from 'koa';
export function createBookHelper(body: Ibook, userId: string, ctx: koa.Context) {
    const id = uuid();
    const index = Users.findIndex((user) => user.id === userId);
    if (index == -1) {
        throw new authError("User doesn't exist", 401);
    }
    if (!body.title) {

        throw new mandatoryFieldError("Invalid Input", 406);
    }
    const book: Ibook = {
        id,
        title: body.title,
        description: body.description ? body.description : "nothing",
        createdAt: new Date().toISOString(),
        authId: ctx.state.payLoad.user
    }
    Books.push(book);
    return id;
}
export function getBookByBookIdHelper(bookId: string) {
    const book = Books.find((book) => book.id === bookId);
    if (book !== undefined) {
        return book;
    }
    else {
        throw new notFoundError("Could not find any book with given ID", 404)
    }
}
export function getBookByUserIdHelper(user: string) {
    const book = Books.filter((book) => book.authId === user);
    if (book.length !== 0) {
        return book;
    }
    else {
        throw new notFoundError("Could not find any book with given ID", 404)
    }
}
export function updateBookHelper(bookId: string, userInput: Ibook) {
    const book = Books.find((book) => book.id === bookId);
    if (book) {


        book.title = userInput.title ? userInput.title : book.title;
        book.description = userInput.description ? userInput.description : book.description;
        book.authId = userInput.authId ? userInput.authId : book.authId;
        return bookId;
    }
    else {
        throw new notFoundError("Not Found", 404)
    }

}
export function deleteBookHelper(bookId: string, userId: string) {
    const user = Books.findIndex((book) => book.authId === userId && book.id === bookId);
    if (user !== -1) {
        Books.splice(user, 1);
        return Books;
    }
    else {
        throw new notFoundError("no book found", 404)
    }
}
export function searchBookByTitle(title: string[] | string) {
    const query: string = Array.isArray(title) ? title[0] : title;
    let filtered;
    filtered = Books.filter(e => {
        return e.title.includes(query);
    })
    return filtered;
}