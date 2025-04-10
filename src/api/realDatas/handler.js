const { RealDataFilterType } = require('../../enum/realData');
const ClientError = require('../../exceptions/ClientError');
const clientError = require('../../exceptions/requestError/requestClientError');
const serverError = require('../../exceptions/requestError/requestServerError');

class RealDatasHandler {
  constructor(realDatasService) {
    this._service = realDatasService;
    
    this.getDataByName = this.getDataByName.bind(this)
    this.getDataByNIM = this.getDataByNIM.bind(this)
    this.getDataByYMD = this.getDataByYMD.bind(this)
  }

  async getDataByName(req, res) {
    try {
      const data = await this._service.getRealData(RealDataFilterType.NAME, req.params);

      return res.send({
        status: 'success',
        message: 'Success Delete User',
        data: data,
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }

  async getDataByNIM(req, res) {
    try {
      const data = await this._service.getRealData(RealDataFilterType.NIM, req.params);

      return res.send({
        status: 'success',
        message: 'Success Delete User',
        data: data,
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }

  async getDataByYMD(req, res) {
    try {
      const data = await this._service.getRealData(RealDataFilterType.YMD, req.params);

      return res.send({
        status: 'success',
        message: 'Success Delete User',
        data: data,
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return clientError(error, res);
      }

      return serverError(error, res);
    }
  }
}

module.exports = RealDatasHandler;
