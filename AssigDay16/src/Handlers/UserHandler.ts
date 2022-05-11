import koa from 'koa';
import { Users } from '../Constant/data';
import { userValidations } from '../validations/validations';

import { checkUser, deleteUserHelper, getUserByIdHelper, searchByUserNameHelper, updateUserHelper, createUserHelper } from '../services/userServices';

export function createUser(ctx: koa.Context) {
    try {
        const body = ctx.request.body;
        userValidations(ctx)
        const id = createUserHelper(body);
        ctx.body = id;
        ctx.status = 201;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
    
}

export function login(ctx: koa.Context) {
    try {
        const body = ctx.request.body;
        const token = checkUser(body);
        ctx.body = token;
        ctx.status=200;
    }
    catch (err: any) {
        ctx.body = err.message;
        ctx.status = err.statusCode;
    }
}

export function getAllUsers(ctx: koa.Context) {
    ctx.body = Users;
    ctx.status=200;
}

export function getuserbyId(ctx: koa.Context) {
    const user  = ctx.params.id;
    try {
        const getUser = getUserByIdHelper(user);
        ctx.body = getUser;
        ctx.status = 200;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}
export function getuserbyid(ctx: koa.Context) {
    const id=ctx.params.id;
    try {
        const getUser = getUserByIdHelper(id);
        ctx.body = getUser;
        ctx.status = 200;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}
export function deleteUser(ctx: koa.Context) {
    const user  = ctx.params.id;
    try {
        const deleteUser = deleteUserHelper(user);
        ctx.status = 200;
        ctx.body = "deleted User";
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function updateuser(ctx: koa.Context) {
    const userInput = ctx.request.body;
    const id=ctx.state.payLoad.user;
    try {
        const updateUser = updateUserHelper(userInput,id);
        ctx.body = "updated User";
        ctx.status = 201;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
        return;
    }
}
export function getAllUserbyId(users:string[]|string)
{
    return  Users.filter(value => users.includes(value.id));
}
export function searchByUserName(ctx: koa.Context) {
    try {
        const { name = '' } = ctx.request.query;
        const filtered = searchByUserNameHelper(name);
        ctx.status = 200;
        ctx.body = filtered;
    }
    catch (err: any) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}