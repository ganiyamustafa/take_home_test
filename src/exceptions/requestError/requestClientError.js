const clientError = (error, res) => {
  return res.status(error.statusCode).send({
    status: 'fail',
    message: error.message,
  });
};

module.exports = clientError;
