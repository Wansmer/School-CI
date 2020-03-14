const axios = require('axios');
const { BASE_URL, headers } = require('../../constants');

exports.getBuildList = async (offset = 0, limit = 25) => {
  const params = {
    offset,
    limit
  };
  try {
    const response = await axios.get(BASE_URL + 'build/list', { headers, params });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

exports.getBuildLog = async (buildId) => {
  try {
    const response = await axios.get(BASE_URL + 'conf', buildId, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildRequest = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildStart = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildFinish = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}

exports.setBuildCancel = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
  } catch (error) {
    console.log(error);
  }
}
