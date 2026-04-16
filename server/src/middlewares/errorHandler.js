class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);   // call the parent constructor
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor) // optional, keeps stack trace clean
  }
}


export const ErrorMiddleware = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  const message = err.message || "Something went wrong";

  const stack = process.env.NODE_ENV === "development" ? err.stack : undefined;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack,
  })
}


export default ErrorHandler
