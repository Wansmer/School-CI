const config = require('./server-conf.json');

const minutes = (count) => {
  return 1000 * 60 * count;
};

const BASE_URL = config.apiBaseUrl;
const API_TOKEN = `Bearer ${ config.apiToken }`;
const PORT = config.port;
const QUEUE_UPDATE_TIMEOUT = minutes(1);
const CHECK_FREEZING_TIMEOUT = minutes(1);

module.exports = {
  QUEUE_UPDATE_TIMEOUT,
  CHECK_FREEZING_TIMEOUT,
  PORT,
  API_TOKEN,
  BASE_URL
};
