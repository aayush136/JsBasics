import { mandatoryFieldError, notFoundError } from "../Error/myError";
import { Books, Users } from "../Constant/data";
import koa from 'koa';
import { Ibook, Iuser } from "../Constant/interface";
import Joi from "joi";

export function userValidations(ctx: koa.Context) {
    const body = ctx.request.body;
    const joiSchema = Joi.object({
        name: Joi.string().min(4).max(20).required(),
        emailId: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required()
    })
    const valid = joiSchema.validate(body);
    if (valid.error) {
        throw new mandatoryFieldError(valid.error.message, 406);
    }
}

export function bookValidations(ctx: koa.Context) {
    const body = ctx.request.body;
    const joiSchema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string()
    });
    const valid = joiSchema.validate(body);
    if (valid.error) {
        throw new mandatoryFieldError(valid.error.message, 406);
    }
}

export function reviewValidations(ctx: koa.Context) {
    const body = ctx.request.body;
    const { user } = ctx.state.payLoad;
    const joiSchema = Joi.object({
        bookId: Joi.string().required(),
        review: Joi.string().required()
    });
    const valid = joiSchema.validate(body);
    if (valid.error) {
        
        throw new mandatoryFieldError(valid.error.message, 406);
    }
    const index = Books.findIndex((book: Ibook) => book.id === body.bookId);
    if (index === -1) {
        throw new notFoundError("Book Not Found", 404);
    }
    const userIndex = Users.findIndex((e: Iuser) => e.id === user);
    if (userIndex === -1) {
        throw new notFoundError("User Not Found", 404);
    }
}