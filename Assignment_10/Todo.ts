
export interface Todo
{
    ID:string;
    title:string;
    description:string;
    createdAt:string;
    status:TodoStatus;
}
export enum TodoStatus {
    PENDING = "PENDING",
    INPROGRESS = "INPROGRESS",
    COMPLETED = "COMPLETED",
}
