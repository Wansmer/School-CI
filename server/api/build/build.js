const axios = require('axios');
const { BASE_URL, headers } = require('../../constants');

exports.getBuildList = async (offset = 0, limit = 25) => {
  const params = {
    offset,
    limit
  };
  try {
    const response = await axios.get(BASE_URL + 'build/list', { headers, params });
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
}

exports.setBuildRequest = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(BASE_URL + '/build/request', data, { headers });
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
}

exports.getBuildLog = async (buildId) => {
  const params = { buildId };
  try {
    const response = await axios.get(BASE_URL + 'build/log', { headers, params });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

exports.getBuildDetails = async (buildId) => {
  const params = { buildId };
  try {
    const response = await axios.get(BASE_URL + 'build/details', { headers, params });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

exports.setBuildStart = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'build/start', data, { headers });
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
}

exports.setBuildFinish = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'build/finish', data, { headers });
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
}

exports.setBuildCancel = async (data) => {
  try {
    const response = await axios.post(BASE_URL + 'build/cancel', data, { headers });
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
}
