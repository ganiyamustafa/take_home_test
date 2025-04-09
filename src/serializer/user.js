/* eslint-disable camelcase */
const { metaSerializer } = require('./utils');

const getUsersSerializer = (
  users, 
  page,
  limit,
  total
) => {
  return {
    users,
    meta: metaSerializer({page, limit, total})
  }
};

module.exports = { getUsersSerializer };
