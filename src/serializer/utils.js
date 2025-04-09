/* eslint-disable camelcase */

const metaSerializer = ({
  page,
  limit,
  total
}) => {
  return {
    page,
    limit,
    total
  }
};

module.exports = { metaSerializer };
