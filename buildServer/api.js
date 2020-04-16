const axios = require('axios');
const https = require('https');

const config = require('./server-conf.json');
const BASE_URL = config.apiBaseUrl;
const API_TOKEN = `Bearer ${ config.apiToken }`;

const axiosWorker = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const headers = {
  accept: 'application/json',
  Authorization: API_TOKEN
};

exports.API = class {
  constructor () {
    this.axios = axiosWorker;
  }

  getConf = async () => {
    try {
      const response = await this.axios.get(BASE_URL + 'conf', { headers });
      return response.data.data || {};
    } catch (error) {
      throw new Error(error);
    }
  }

  getBuildList = async (offset = 0, limit = 35) => {
    const params = {
      offset,
      limit
    };
    try {
      const response = await this.axios.get(BASE_URL + 'build/list', { headers, params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };


  getBuildDetails = async (buildId) => {
    const params = { buildId };
    try {
      const response = await this.axios.get(BASE_URL + 'build/details', { headers, params });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  setBuildStart = async (data) => {
    try {
      const response = await this.axios.post(BASE_URL + 'build/start', data, { headers });
      return response.status;
    } catch (error) {
      throw error;
    }
  };

  setBuildFinish = async (data) => {
    try {
      const response = await this.axios.post(BASE_URL + 'build/finish', data, { headers });
      return response.status;
    } catch (error) {
      throw error;
    }
  };

  setBuildCancel = async (data) => {
    try {
      const response = await this.axios.post(BASE_URL + 'build/cancel', data, { headers });
      return response.status;
    } catch (error) {
      return error;
    }
  };

}
