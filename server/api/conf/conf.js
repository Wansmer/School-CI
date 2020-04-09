const axios = require('axios');
const { BASE_URL, headers } = require('../../constants');

exports.Conf = class {

  constructor() {
    this.axios = axios;
  }

  getConf = async () => {
    try {
      const response = await this.axios.get(BASE_URL + 'conf', { headers });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  setConf = async (data) => {
    try {
      data.period = +data.period;
      const response = await this.axios.post(BASE_URL + 'conf', data, { headers });
      return response.status;
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteConf = async () => {
    try {
      const response = await this.axios.delete(BASE_URL + 'conf', { headers });
      return response.status;
    } catch (error) {
      throw new Error(error);
    }
  }
}
