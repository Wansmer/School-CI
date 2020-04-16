const config = require('./agent-conf.json');
const path = require('path');
const https = require('https');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended: false});
const app = express();
const { Builder } = require('./Builder');
const { GitHelper } = require('./GitHelper');
const { makeUrl, getDurationFrom } = require('./utils');

const builder = new Builder();
const gitHelper = new GitHelper('http://github.com/');

const PORT = config.port;
const SERVER_PORT = config.serverPort;
const SERVER_HOST = config.serverHost;

app.use(cors());
app.use(morgan('dev'));

const url = makeUrl({ port: SERVER_PORT, host: SERVER_HOST })
const id = {
  host: '127.0.0.1',
  port: PORT
};

const launchNotification = async () => {
  try {
    await axios.post(`${ url }/notify-agent`, id, { 'Content-Type': 'application/json' });
  } catch (error) {
    console.log('Попытка подключения');
    setTimeout(launchNotification, 10000);
  }
}

const sendResult = async ({ result, id }) => {
  try {
    return await axios.post(`${ url }/notify-build-result`, { result, id });
  } catch (error) {
    console.log(error);
  }
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, 3000));
}

const startBuilding = async (build) => {
  console.log(build);
  await gitHelper.cloneRepo(build);
  const result = await builder.building(build);
  await sendResult({ result, id });
}

launchNotification();

app.post('/build', jsonParser, (req, res) => {
  console.log(req.body);
  startBuilding(req.body.build);
  res.sendStatus(200);
});


app.listen(PORT);