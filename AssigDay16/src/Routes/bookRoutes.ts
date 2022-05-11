import { getAllBooks, getBookByBookId, createBook, updateBook, deleteBook, getBookByUserId, searchByBookTitle } from '../Handlers/BookHandler';
import koaRouter from 'koa-router';
import verify from '../middleware/verify';

const bookRouter = new koaRouter();

bookRouter.prefix("/book");
bookRouter.get('/', verify, getAllBooks);
bookRouter.get("/:id", verify, getBookByBookId);
bookRouter.post("/", verify, createBook);
bookRouter.put("/:id", verify, updateBook);
bookRouter.delete("/:id", verify, deleteBook);
bookRouter.get("/user/:id", verify, getBookByUserId);
bookRouter.get("/bookTitle", verify, searchByBookTitle);

export default bookRouter;