export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static Unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static NotFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static InternalError(message = 'Internal server error') {
    return new ApiError(500, message);
  }

  static InvalidCredentials(message = 'Invalid credentials') {
    return new ApiError(401, message);
  }

  static InvalidId(message = 'Invalid ID') {
    return new ApiError(400, message);
  }
}
