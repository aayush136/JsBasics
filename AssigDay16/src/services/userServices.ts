import { Iuser } from "../Constant/interface"
import { v4 as uuid } from 'uuid';
import jsonwebtoken from "jsonwebtoken";
import { Users, secretKey } from "../Constant/data";
import { authError, mandatoryFieldError, notFoundError } from "../Error/myError";
export function createUserHelper(body: Iuser) {
    const ID = uuid();
    Users.forEach((user)=>{
        if(user.emailId===body.emailId)
        throw new authError("already existing user",406);
    })
    const user: Iuser = {
        name: body.name,
        emailId: body.emailId,
        password: body.password,
        id: ID
    }
    Users.push(user);
    console.log(Users)
    return ID;
}
export function checkUser(body: Iuser) {
    if(!body.password||!body.emailId)
    {
        throw new mandatoryFieldError("missing field",406);
    }
    const check = Users.findIndex((obj) => obj.emailId === body.emailId && obj.password === body.password);
    if (check == -1) {
        throw new authError("invalid credentials", 401);
    }
    const token = jsonwebtoken.sign({ user: Users[check].id }, secretKey);
    
    return token;
}
export function getUserByIdHelper(user: string) {
    const users = Users.find((e) => e.id === user);
    if (users) {
        return users;
    }
    else {
        throw new notFoundError("Could not find any user with given ID", 404);
    }
}

export function deleteUserHelper(user: string) {
    const index = Users.findIndex((obj) => obj.id === user);
    if (index !== -1) {
        Users.splice(index, 1);

    }
    else {
        throw new notFoundError("No user present", 404)
    }
}
export function updateUserHelper(userInput: Iuser, userId: string) {
     console.log("updating "+ userId)
    const user = Users.find((obj) =>
        obj.id === userId);
        console.log(user)
        console.log(Users);
    if (user) {
        console.log("this");
        user.name = userInput.name ? userInput.name : user.name;
        user.emailId = userInput.emailId ? userInput.emailId : user.emailId;
        user.password = userInput.password ? userInput.password : user.password;
    }
    else {
        throw new notFoundError("Not Found", 404)
    }
}
export function searchByUserNameHelper(name: string | string[]) {
    const query: string = Array.isArray(name) ? name[0] : name;
    let filtered;
    filtered = Users.filter(e => {
        return e.name.includes(query);
    })
    return filtered;
}