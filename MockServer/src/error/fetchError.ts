export class fetchError extends Error {
    statusCode: number;
    constructor(message: string, errStatus: number) {
        super(message);
        this.message = message;
        this.statusCode = errStatus;
    }
}