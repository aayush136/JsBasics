import supertest from 'supertest';
import { app } from '../index';
let token = '';
let userId = '';
let bookId = '';
let apptest=supertest(app.callback());
beforeAll(async () => {
    const response = await apptest.post("/user/signup").send({
        name: "Aayush",
        emailId: "aayush@gmail.com",
        password: "stringadsdsf",
    });
    userId = response.text;
    const res = await apptest.post("/user/login").send({
        emailId: "aayush@gmail.com",
        password: "stringadsdsf",
    });
    token = `bearer ${res.text}`;
    const result = await apptest.post("/book").set('Authorization', token).send({
        title: "comic",

    })
    bookId = result.text;
})
describe('checking review routes', () => {
    describe('checking for creating review',()=>{
        it('check for creating review and response 201', async () => {
            const res = await apptest.post("/review").send({
                bookId, review: "great"
            }).set('authorization', token);
            expect(res.statusCode).toBe(201);
        })
        it('check for creating review with invalid bookId', async () => {
            const res = await apptest.post("/review").send({
                bookId:"123", review: "great"
            }).set('authorization', token);
            expect(res.statusCode).toBe(404);
        })
        it('check for creating review with invalid auth', async () => {
            const res = await apptest.post("/review").send({
                bookId:"123", review: "great"
            }).set('authorization', "token");
            expect(res.statusCode).toBe(401);
        })
        it('check for creating review with mandatory field error', async () => {
            const res = await apptest.post("/review").send({
                bookId:"123"
            }).set('authorization', token);
            expect(res.statusCode).toBe(406);
        })
    })
    describe('checking get request',()=>{
        it("should get reviews by bookId",async()=>{
            const res=await apptest.get(`/review/${bookId}`).set('authorization', token);
            expect(res.statusCode).toBe(200);
        })
        it("passing invalid book id should response 404",async()=>{
            const res=await apptest.get(`/review/234`).set('authorization', token);
            expect(res.statusCode).toBe(404);
        })
        it("passing invalid auth for bookId should response 401",async()=>{
            const res=await apptest.get(`/review/234`).set('authorization', "token");
            expect(res.statusCode).toBe(401);
        })
        it("should get reviews by userId",async()=>{
            const res=await apptest.get(`/review/user/${userId}`).set('authorization', token);
            expect(res.statusCode).toBe(200);
        })
        it("passing invalid user id should response 404",async()=>{
            const res=await apptest.get(`/review/user/234`).set('authorization', token);
            expect(res.statusCode).toBe(404);
        })
        it("passing invalid auth for userId should response 401",async()=>{
            const res=await apptest.get(`/review/user/234`).set('authorization', "token");
            expect(res.statusCode).toBe(401);
        })
        

    })

   
})