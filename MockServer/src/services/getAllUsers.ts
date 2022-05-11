import axios from 'axios';
import { fetchError } from '../error/fetchError';
export async function getAllUsers(users: string[], token: string) {

    return axios.post("http://localhost:3011/user/list", {
        id: users
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    ).then((response) => response.data).catch(err => {
        const { status, statusText } = err.response;
        throw new fetchError(statusText, status);
    });
}