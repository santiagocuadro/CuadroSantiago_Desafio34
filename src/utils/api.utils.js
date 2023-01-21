const successResponse = (data) => {
  return {
    success: true,
    data,
  };
};

const errorResponse = (message, details = null) => {
  return {
    success: false,
    message,
    details,
  };
};

class HttpError {
  constructor(status, message, details) {
    this.statusCode = status;
    this.message = message;
    this.details = details;
  }
}
export {
  successResponse,
  errorResponse,
  HttpError,
};
