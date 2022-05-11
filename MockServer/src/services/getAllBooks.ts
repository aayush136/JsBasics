import axios from "axios";
import { IBook } from "../constant/Idata";
import { fetchError } from "../error/fetchError";
export function getAllBooks(token: string): Promise<IBook[]> {
    return axios.get("http://localhost:3011/book?limit=2", {
        headers: {
            Authorization:
                `bearer ${token}`
        }
    }).then((response: any) => {
        return response.data;
    }).catch(err => {

        const { status, statusText } = err.response;
        throw new fetchError(statusText, status);
    });
}