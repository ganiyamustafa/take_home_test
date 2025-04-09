const clientError = (error, h) => {
  const response = h.response({
    status: 'fail',
    message: error.message,
  });
  response.code(error.statusCode);
  return response;
};

module.exports = clientError;
