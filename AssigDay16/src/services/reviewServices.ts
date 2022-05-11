import { v4 as uuid } from 'uuid';
import { Ireview } from '../Constant/interface';
import { Reviews } from '../Constant/data';
import { mandatoryFieldError, notFoundError } from '../Error/myError';
import { Books } from '../Constant/data';
export function createReviewHelper(body: Ireview, userId: string) {
    const id = uuid();
    const review: Ireview = {
        review: body.review,
        createdAt: new Date().toISOString(),
        id: id,
        userId,
        bookId: body.bookId

    }
    Reviews.push(review);
    return id;
}
export function getTwoReviewsbyBookIdHelper(bookId:string[])
{
    let obj:any={};
    bookId.forEach((bookid)=>{obj[bookid]=[];})
    Reviews.forEach((review)=>{
        if(obj[review.bookId]&&obj[review.bookId].length<2)
        {
            let reviews=obj[review.bookId];
            reviews.push(review);
            obj[review.bookId]=reviews;
        }
    })
    return obj;
}
export function updateReviewHelper(id: string, body: Ireview, user: string) {
    const review = Reviews.find((obj) => obj.id == id);
    if (review) {
        if (review.userId !== user) {
            throw new notFoundError('user not found', 404);
        }
        review.review = body.review ? body.review : review.review;
        return id;
    }
    else {
        throw new notFoundError("not Found", 404);
    }
}
export function deleteReviewHelper(id: string, user: string) {
    const index = Reviews.findIndex((obj) => obj.id === id && obj.userId === user);
    console.log("UserId", user, "ReviewId", id);
    console.log(Reviews);
    if (index !== -1) {
        Reviews.splice(index, 1);
         return Reviews;
    }
    else {
        throw new notFoundError("No user present", 404)
    }
}
export function fetchBookReviews(bookId: string) {
    const bookIndex = Books.findIndex((book) => book.authId === bookId);
    if (bookIndex === -1) {
        throw new notFoundError("Book doesn't exist", 404);
    }
    const review: Ireview[] = Reviews.filter((e) => e.bookId === bookId);
    return review;
}
export function getReviewByBookIdHelper(id: string) {
    const review: Ireview[] | undefined = Reviews.filter((obj: Ireview) => obj.bookId === id);
    if (review.length!==0) {
        return review;
    }
    else {
        throw new notFoundError("Not Found", 404);
    }
}
export function getReviewByUserIdHelper(id: string) {
    const review: Ireview[] | undefined = Reviews.filter((obj) => obj.userId === id);
    if (review.length!==0) {
        return review;
    }
    else {
        throw new notFoundError("Not Found", 404);
    }
}