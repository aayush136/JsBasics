// class myError extends Error {
//     statusCode: number;
//     constructor(message: string, errStatus: number) {
//         super(message);
//         this.name = "Custom message";
//         this.statusCode = errStatus;
//     }
// }
export class authError extends Error {
    statusCode: number;
    constructor(message: string, errStatus: number) {
        super(message);
        this.name = "Custom message";
        this.statusCode = errStatus;
    }
}
export class notFoundError extends Error {
    statusCode: number;
    constructor(message: string, errStatus: number) {
        super(message);
        this.name = "Custom message";
        this.statusCode = errStatus;
    }
}
export class mandatoryFieldError extends Error {
    statusCode: number;
    constructor(message: string, errStatus: number) {
        super(message);
        this.name = "Custom message";
        this.statusCode = errStatus;
    }
}
//export default myError;