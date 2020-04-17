const axios = require('axios');
const { makeUrl } = require('./utils');
const { Builder } = require('./Builder');
const { GitHelper } = require('./GitHelper');
const { GIT_PATH, PORT, HOST, SERVER_PORT, SERVER_HOST } = require('./constants');

const builder = new Builder();
const gitHelper = new GitHelper(GIT_PATH);

const url = makeUrl({ port: SERVER_PORT, host: SERVER_HOST })
const id = {
  host: HOST,
  port: PORT
};


const launchNotification = async () => {
  try {
    await axios.post(`${ url }/notify-agent`, id, { 'Content-Type': 'application/json' });
  } catch (error) {
    console.log('Error of connect. Retry...');
    setTimeout(launchNotification, 10000);
  }
}

const sendResult = async ({ result, id }) => {
  try {
    await axios.post(`${ url }/notify-build-result`, { result, id });
  } catch (error) {
    setTimeout(() => {sendResult({ result, id })}, 10000);
    console.log(error.message);
  }
}

const startBuilding = async (build) => {
  try {
    await builder.clearCloneDirectory();
    const git =  gitHelper.cloneRepo(build);
    await git;
    const building = builder.building(build);
    const result = await building;
    const clear =  builder.clearCloneDirectory();
    await clear;
    await sendResult({ result, id });
  } catch (error) {
    console.log(error.message);
  }
}

const buildHandler = (req, res) => {
  startBuilding(req.body.build);
  res.sendStatus(200);
};

module.exports = { launchNotification, buildHandler };
