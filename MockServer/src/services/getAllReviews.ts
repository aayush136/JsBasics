import axios from 'axios';
import { fetchError } from '../error/fetchError';
export async function getAllReviews(books: string[], token: string): Promise<any> {

    return axios.post("http://localhost:3011/review/list", {
        id: books
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {

        return response.data;
    }).catch(err => {
        const { status, statusText } = err.response;
        throw new fetchError(statusText, status);
    });
}