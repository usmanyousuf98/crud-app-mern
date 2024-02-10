class CustomError extends Error {
  constructor({ statusCode, message }) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  let { statusCode, message } = err;

  console.error("message", message);

  if (!statusCode) statusCode = 500;
  if (statusCode == 401) message = "oijihihi Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = {
  handleError,
  CustomError,
};
