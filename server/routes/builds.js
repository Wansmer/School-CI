const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({extended: false});
const { getCommitInfo } = require('../app/process');
const { queueAPI } = require('../queueAPI');

const build = require('../api/build/build');
const conf = require('../api/conf/conf');

const QuAPI = new queueAPI('./storage/queue.txt');

router.get('/', async (req, res) => {
  try {
    const response = await build.getBuildList();
    const data = response;
    res.send(data);
  } catch (error) {
    res.send(error);
  }
})

router.get('/:buildId/logs', async (req, res) => {
  try {
    const response = await build.getBuildLog(req.params.buildId);
    let data = response.data;
    data = JSON.stringify(data);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
})

router.get('/:buildId', async (req, res) => {
  try {
    const response = await build.getBuildDetails(req.params.buildId);
    const data = response.data;
    res.send(data);
  } catch (error) {
    res.send(error);
  }
})

router.post('/:commitHash', jsonParser, async (req, res) => {
  try {
    const settings = await conf.getConf();
    const commitInfo = await getCommitInfo(req.params.commitHash, settings);
    const buildInfo = await build.setBuildRequest(commitInfo);
    QuAPI.addLine(commitInfo.commitHash, buildInfo, settings);
    res.send(buildInfo);
  } catch (error) {
    res.send(error);
  }
})

module.exports = router;
