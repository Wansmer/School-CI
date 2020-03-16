const axios = require('axios');
const { BASE_URL, headers } = require('../../constants');

exports.getConf = async () => {
  try {
    const response = await axios.get(BASE_URL + 'conf', { headers });
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
}

exports.setConf = async (data) => {
  try {
    data.period = +data.period;
    const response = await axios.post(BASE_URL + 'conf', data, { headers });
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
}

exports.deleteConf = async () => {
  try {
    const response = await axios.delete(BASE_URL + 'conf', { headers });
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
}
