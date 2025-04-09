const serverError = (error, res) => {
  console.log(error)
  return res.status(500).send({
    status: 'error',
    message: 'Maaf, terjadi kegagalan pada server kami.',
  });
};

module.exports = serverError;
