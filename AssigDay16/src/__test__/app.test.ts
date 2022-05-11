
import {app} from '../index'
import supertest from 'supertest';
const apptest=supertest(app.callback());
describe('Testcases for Users Routes',()=>{
    let token='';
    let id='';
    describe('/signup',()=>{
        it('correct signup',async ()=>{
            const res=await apptest.post("/user/signup").send({
                name: "Aayush",
      emailId: "aayush@gmail.com",
      password: "stringadsdsf",
            });
          id=res.text;
            expect(res.statusCode).toBe(201);
        })
        it('incorrect signup',async ()=>{
            const res=await apptest.post("/user/signup").send({
                emailId: "aayush@gmail.com",
                password: "stringadsdsf",
            });
            expect(res.statusCode).toBe(406);
        })
        it('user already sign up',async()=>{
            const res=await apptest.post("/user/signup").send({
                name: "Aayush",
      emailId: "aayush@gmail.com",
      password: "stringadsdsf",
            });
            expect(res.statusCode).toBe(406);
        })
        
    })
   describe('/login',()=>{
    it('checking correct login ',async()=>{
        const res=await apptest.post("/user/login").send({
            emailId: "aayush@gmail.com",
  password: "stringadsdsf",
        });
        token=`bearer ${res.text}`;
        expect(res.statusCode).toBe(200);
    })
    it ('checking  login skipping some value',async()=>{
        const res=await apptest.post("/user/login").send({
            emailId: "aayush@gmail.com",
        });
        expect(res.statusCode).toBe(406);
    })
    it ('checking login incorrect password',async()=>{
        const res=await apptest.post("/user/login").send({
            emailId: "aayush@gmail.com",
  password: "stringadsds",
        })
        expect(res.statusCode).toBe(401);
    })
   })
   describe("/getAllUsers",()=>{
    it('checking correct case for getallUsers',async()=>{
        const res=await apptest.get("/user").set('Authorization',token)
        expect(res.statusCode).toBe(200);
    })
    it('checking incorrect case for getallUsers',async()=>{
        const res=await apptest.get("/user").set('Authorization',"token")
        expect(res.statusCode).toBe(401);
    })
   })
    describe("/getuserbyId",()=>{
        it('checking positive case for getuserbyid ',async()=>{
            const res=await apptest.get(`/user/${id}`).set('Authorization',token)
            expect(res.statusCode).toBe(200);
        })
        it('checking negative case for getuserbyid ',async()=>{
            const res=await apptest.get(`/user/2335`).set('Authorization',token)
            expect(res.statusCode).toBe(404);
        })
        it('checking authorization case for getuserbyid ',async()=>{
            const res=await apptest.get(`/user/2335`).set('Authorization',"token")
            expect(res.statusCode).toBe(401);
        })
    })
    describe("update user",()=>{
        it ('checking positive case for update user',async()=>{
            const res=await apptest.put(`/user/`).set('Authorization',token)
            expect(res.statusCode).toBe(201);
        })
        it ('checking negative case for update user',async()=>{
            const res=await apptest.put(`/user/`).set('Authorization',"token")
            expect(res.statusCode).toBe(401);
        })
    })
    it ('checking for update user',async()=>{
        const res=await apptest.put(`/user/${id}`).set('Authorization',token)
    })
    describe(" delete user",()=>{
        it ('checking positive case for deleteById',async()=>{
            const res=await apptest.delete(`/user/${id}`).set('Authorization',token)
            expect(res.statusCode).toBe(200);
        })
        it ('checking negative case for deleteById',async()=>{
            const res=await apptest.delete(`/user/234`).set('Authorization',token)
            expect(res.statusCode).toBe(404);
        })
        it ('checking autorization case for deleteById',async()=>{
            const res=await apptest.delete(`/user/${id}`).set('Authorization',"token")
            expect(res.statusCode).toBe(401);
        })
        
        
    })
   
  
})