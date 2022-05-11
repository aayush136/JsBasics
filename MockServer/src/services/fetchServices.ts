import { IBook, IReview, IUser } from "../constant/Idata";
import { makeIFeed } from "./makeIFeed";
import { getAllReviews } from './getAllReviews';
import { getAllUsers } from './getAllUsers';
import { fetchError } from "../error/fetchError";

export async function fetchData(books: IBook[], token: string) {
    let data = [];
    try {

        const uniqueUserId: Set<string> = new Set();
        let users: IUser[] = [];
        let reviews: Record<string, IReview[]>;
        books.forEach((book) => { uniqueUserId.add(book.authId) })

        let bookIds: string[] = [];
        books.forEach((book) => { bookIds.push(book.id) });
        let Users: IUser[] = [];
        reviews = await getAllReviews(bookIds, token);
        Object.entries(reviews).forEach((arr) => arr[1].forEach((review: IReview) => uniqueUserId.add(review.userId)));

        users = await getAllUsers([...uniqueUserId], token);
        users = users.map((user:IUser) => {
             let modifiedUser = {
                name: user.name,
                emailId: user.emailId,
                id: user.id
             }
             return modifiedUser;
        })

        const usersMap: Map<string, IUser> = new Map();
        users.forEach((user) => usersMap.set(user.id, user));
        data = makeIFeed(books, users, reviews)
    }
    catch (err: any) {
        throw new fetchError(err.message, err.statusCode);
    }
    return data;
}
