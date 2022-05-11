import { IBook, IFeed, IReview, IUser } from "../constant/Idata";
export function makeIFeed(books: IBook[], users: IUser[], reviewsObj: Record<string, IReview[]>): IFeed[] {
    const usersMap: Map<string, IUser> = new Map();
    users.forEach((user) => usersMap.set(user.id, user))
    let data: IFeed[] = [];
    for (const book of books) {
        let obj: IFeed;
        const author = usersMap.get(book.authId)!;
        const reviews = reviewsObj[book.id];
        const formatReviews = formatReviewerInfo(reviews, usersMap)
        obj = {
            userInfo: author,
            bookInfo: book,
            reviews: formatReviews
        }
        data.push(obj);
    }
    return data;
}
function formatReviewerInfo(reviews: IReview[], userMap: Map<string, IUser>) {

    const reviewerInfo: IReview[] = reviews.map(review => {
        const user = userMap.get(review.userId)!;
        review.reviewerInfo = user;
        return review;
    });
    return reviewerInfo;
}