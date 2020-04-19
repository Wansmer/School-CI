const config = require('./agent-conf.json');

const GIT_PATH = 'https://github.com/';
const PORT = config.port;
const HOST = '127.0.0.1';
const SERVER_HOST = config.serverHost;
const SERVER_PORT = config.serverPort;
const RESEND_TO_SERVER = 10000;

module.exports = {
  GIT_PATH,
  PORT,
  HOST,
  SERVER_HOST,
  SERVER_PORT,
  RESEND_TO_SERVER
}

