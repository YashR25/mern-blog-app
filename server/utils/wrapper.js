const error = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};

const success = (statusCode, result) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

module.exports = { error, success };
