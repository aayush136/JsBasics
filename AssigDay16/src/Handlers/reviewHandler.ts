import { reviewValidations } from "../validations/validations";
import koa, { Context } from 'koa';
import { createReviewHelper, deleteReviewHelper, fetchBookReviews, getReviewByBookIdHelper, getReviewByUserIdHelper, getTwoReviewsbyBookIdHelper, updateReviewHelper } from "../services/reviewServices";

export function createReview(ctx: koa.Context) {
    const body = ctx.request.body;
    const { user } = ctx.state.payLoad;
    try {
        reviewValidations(ctx);
        const id = createReviewHelper(body, user);
        ctx.status = 201;
        ctx.body = id;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function updateReview(ctx: koa.Context) {
    const id = ctx.params.id;
    const body = ctx.request.body;
    const { user } = ctx.state.payLoad;

    try {
        const updateReviewId = updateReviewHelper(id, body, user);
        ctx.status = 201;
        ctx.body = updateReviewId;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function deleteReview(ctx: koa.Context) {
    const id = ctx.params.id;
    const { user } = ctx.state.payLoad;
    try {

        reviewValidations(ctx);
        const reviews=deleteReviewHelper(id, user);
        ctx.body = reviews;
        ctx.status = 200;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }

}

export function getReviewByBookId(ctx: koa.Context) {
    const id = ctx.params.id;
    try {
        const reviews = getReviewByBookIdHelper(id);
        ctx.status = 200;
        ctx.body = reviews;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}

export function getReviewByUserId(ctx: koa.Context) {
    const id = ctx.params.id;
    try {
        const reviews = getReviewByUserIdHelper(id);
        ctx.body = reviews;
        ctx.status = 200;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}
export function getTwoReviewsByBookId(bookId:string[])
{
    console.log("bookIds ",bookId)
   return getTwoReviewsbyBookIdHelper(bookId);
    
}
export function getBookReviews(ctx: Context) {
    try {
        const { bookId } = ctx.params;
        const reviews = fetchBookReviews(bookId);
        ctx.status = 200;
        ctx.body = reviews;
    }
    catch (err: any) {
        ctx.status = err.statusCode;
        ctx.body = err.message;
    }
}