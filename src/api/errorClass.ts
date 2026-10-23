export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    
    // This ensures the stack trace doesn't include this constructor function
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequest extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class Unauthorized extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class Forbidden extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}