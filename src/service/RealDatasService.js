const { RealDataFilterType } = require('../enum/realData');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { getRealDataSerializer } = require('../serializer/realData');
const axios = require('axios').default;

class RealDatasService {
  constructor() {
    this._url = 'https://ogienurdiana.com/career/ecc694ce4e7f6e45a5a7912cde9fe131'
  }

  async #getRawData() {
    const response = await axios.get(this._url);

    return await response.data;
  }

  async getRealData(filterType, { name, nim, ymd }) {
    const { DATA: data } = await this.#getRawData();

    if (!data) {
      throw new NotFoundError('real data not found');
    }

    const rawData = data.split('\n');
    const fieldData = Object.fromEntries(rawData[0].split('|').map((v, i) => [v, i]));

    const userRawData = rawData.filter(( d ) => {
      switch (filterType) {
        case RealDataFilterType.NAME:
          return d.split('|')[fieldData.NAMA] === name;
        case RealDataFilterType.NIM:
          return d.split('|')[fieldData.NIM] === nim;
        case RealDataFilterType.YMD:
          return d.split('|')[fieldData.YMD] === ymd;
      }

      return false
      // return d.includes(name);
    });

    if (userRawData.length == 0) {
      throw new NotFoundError(`user data not found`);
    }

    var userData = userRawData[0].split('|');
    
    return getRealDataSerializer(userData, fieldData);
  }
}

module.exports = RealDatasService;
