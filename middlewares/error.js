class ErrorHandler extends Error{
    constructor(message, statusCode, successMessage){
        super(message);
        this.statusCode = statusCode;
        this.successMessage = successMessage;
    }
}

export const errorMiddleware = (err,req,res,next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    err.successMessage = err.successMessage || false;
    return res.status(err.statusCode).json({
        success: err.successMessage,
        message: err.message,
    });
};

export default ErrorHandler;