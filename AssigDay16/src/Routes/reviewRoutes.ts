import koaRouter from 'koa-router';
import { createReview, deleteReview, getReviewByBookId, getReviewByUserId, getTwoReviewsByBookId, updateReview } from '../Handlers/reviewHandler';
import verify from '../middleware/verify'

const reviewRouter = new koaRouter();

reviewRouter.prefix("/review");
reviewRouter.get("/:id", verify, getReviewByBookId);
reviewRouter.get("/user/:id", verify, getReviewByUserId);
reviewRouter.post("/", verify, createReview);
reviewRouter.delete("/:id", verify, deleteReview);
reviewRouter.put("/:id", verify, updateReview);
reviewRouter.post("/list", verify, (ctx) => {
    const bookIds = ctx.request.body.id;
    const res = getTwoReviewsByBookId(bookIds)
    ctx.body = res;
});

export default reviewRouter;