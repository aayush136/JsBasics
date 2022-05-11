export interface IFeed {
    userInfo: IUser,
    bookInfo: IBook,
    reviews: IReview[]
}
export interface IReview {
    reviewerInfo: IUser|string,
    id: string,
    review: string,
    bookId: string,
    createdAt: string,
    userId:string
}
export interface IBook {
    title: string,
    description: string,
    createdAt: string,
    id: string,
    authId: string
}
export interface IUser {
    name: string,
    emailId: string,
    id: string
}