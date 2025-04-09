const serverError = (error, h) => {
  const response = h.response({
    status: 'error',
    message: 'Maaf, terjadi kegagalan pada server kami.',
  });
  response.code(500);
  console.log(error);
  return response;
};

module.exports = serverError;
