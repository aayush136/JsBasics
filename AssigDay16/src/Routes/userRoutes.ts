import KoaRouter from 'koa-router';
import { getAllUsers, createUser, getuserbyId, updateuser, deleteUser, searchByUserName, login ,getuserbyid, getAllUserbyId} from '../Handlers/UserHandler';
import verify from '../middleware/verify'

const userRouter = new KoaRouter();
userRouter.prefix("/user");
userRouter.get('/', verify, ctx => ctx.request.querystring ? searchByUserName(ctx) : getAllUsers(ctx) );
userRouter.post("/signup", createUser)
userRouter.post("/login",login);
userRouter.get("/:id", verify, getuserbyId)
userRouter.put("/", verify, updateuser)
userRouter.delete("/:id", verify, deleteUser)
userRouter.post("/list",verify,(ctx)=>{
    const {id}=ctx.request.body;
    const data=getAllUserbyId(id);
        ctx.body=data;
});
export default userRouter;