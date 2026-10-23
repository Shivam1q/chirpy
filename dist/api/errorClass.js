export class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // This ensures the stack trace doesn't include this constructor function
        Error.captureStackTrace(this, this.constructor);
    }
}
export class BadRequest extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
export class Unauthorized extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
export class Forbidden extends AppError {
    constructor(message) {
        super(message, 403);
    }
}
export class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}
