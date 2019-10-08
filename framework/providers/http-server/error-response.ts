export class ErrorResponse {
    status: number;
    message: any;

    constructor(error: Error|any, status: number = 400) {
        if(status < 400 || status >= 600) {
            throw error;
        }
        this.status = status;
        this.message = error.message || error;
    }
}
