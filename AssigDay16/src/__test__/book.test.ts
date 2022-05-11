import supertest from "supertest";
import request from "supertest";
import { app} from "../index";
//  import "@types/jest"
let token = '';
let userId='';
const apptest=supertest(app.callback());
beforeAll(async () => {

    const response = await apptest.post("/user/signup").send({
        name: "Aayush",
        emailId: "aayush@gmail.com",
        password: "stringadsdsf",
    });
    userId=response.text;
    const res = await apptest.post("/user/login").send({
        emailId: "aayush@gmail.com",
        password: "stringadsdsf",
    });
    token = `bearer ${res.text}`;
})
describe('checking books routes', () => {
    let bookId='';
    describe('checking for createBook', () => {
        it('check is book getting created', async () => {
            const res = await apptest.post("/book").set('Authorization', token).send({
                title: "comic",
              
            })
            bookId=res.text;
            expect(res.statusCode).toBe(201);
        })
        it ('check authorization for book getting created',async()=>{
            const res = await apptest.post("/book").set('Authorization', "token").send({
                title: "comic",

            })
            expect(res.statusCode).toBe(401);
        })
        it ('check mandatory field error for book getting created',async()=>{
            const res = await apptest.post("/book").set('Authorization',token).send({
               

            })
            expect(res.statusCode).toBe(406);
        })

    })
    describe('checking for getting all books',()=>{
        it('check for getting all books', async () => {
            const res = await apptest.get("/book").set('Authorization', token)
            expect(res.statusCode).toBe(200);
        })
        it('check for authorization for  getting all books', async () => {
            const res = await apptest.get("/book").set('Authorization', "token")
            expect(res.statusCode).toBe(401);
        })
        
    })
    describe('checking for getBookById',()=>{
        it('check for getting book by id and returns 200', async () => {
            const res = await apptest.get(`/book/${bookId}`).set('Authorization', token)
            expect(res.statusCode).toBe(200);
        })
        it('check for getting book by id by invalid authorization', async () => {
            const res = await apptest.get(`/book/${bookId}`).set('Authorization', "token")
            expect(res.statusCode).toBe(401);
        })
        it('check for getting book by invalid id ', async () => {
            const res = await apptest.get(`/book/234`).set('Authorization', token)
            expect(res.statusCode).toBe(404);
        })
    })
    describe('checking for getBookByUserId',()=>{
        it('check for getting book by UserId and returns 200', async () => {
            const res = await apptest.get(`/book/user/${userId}`).set('Authorization', token)
            expect(res.statusCode).toBe(200);
        })
        it('check for getting book by invalid  UserId', async () => {
            const res = await apptest.get(`/book/user/345`).set('Authorization', token)
            expect(res.statusCode).toBe(404);
        })
        it('check for getting book by UserId invalid auth', async () => {
            const res = await apptest.get(`/book/user/345`).set('Authorization', "token")
            expect(res.statusCode).toBe(401);
        })
    })
    describe('checking for update',()=>{
        it('check for updating book and returns 200', async () => {
            const res = await apptest.put(`/book/${bookId}`).set('Authorization', token)
            expect(res.statusCode).toBe(200);
        })
        it('check for updating book with wrong bookId', async () => {
            const res = await apptest.put(`/book/123`).set('Authorization', token)
            expect(res.statusCode).toBe(404);
        })
        it('check for updating book with wrong auth', async () => {
            const res = await apptest.put(`/book/123`).set('Authorization', "token")
            expect(res.statusCode).toBe(401);
        })
    })
    describe('checking for delete',()=>{
        it('check for delete book and returns 200', async () => {
            const res = await apptest.delete(`/book/${bookId}`).set('Authorization', token)
            expect(res.statusCode).toBe(200);
        })
        it('check for delete book with invalid bookId', async () => {
            const res = await apptest.delete(`/book/1234`).set('Authorization', token)
            expect(res.statusCode).toBe(404);
        })
        it('check for delete book with invalid auth', async () => {
            const res = await apptest.delete(`/book/1234`).set('Authorization', "token")
            expect(res.statusCode).toBe(401);
        })
    })
})