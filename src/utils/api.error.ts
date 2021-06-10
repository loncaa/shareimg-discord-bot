class ApiError extends Error{
    statusCode!: String;

    constructor(statusCode, message){
        super(message);

        this.statusCode = statusCode;
    }
}

export default ApiError;