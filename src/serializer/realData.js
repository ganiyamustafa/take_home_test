/* eslint-disable camelcase */

const getRealDataSerializer = (
  datas,
  fieldDatas
) => {
  return {
    'nim': datas[fieldDatas.NIM],
    'ymd': datas[fieldDatas.YMD],
    'name': datas[fieldDatas.NAMA]
  }
};

module.exports = { getRealDataSerializer };
