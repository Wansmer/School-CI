const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { spawn, fork, exec } = require('child_process');
const { watcher } = require('../app/watcher');
const jsonParser = bodyParser.json({extended: false});

const build = require('../api/build/build');
const conf = require('../api/conf/conf');

const statuses = {
  'Waiting': "Ticket_status_process",
  'InProgress': "Ticket_status_process",
  'Success': "Ticket_status_success",
  'Fail': "Ticket_status_error",
  'Canceled': "Ticket_status_success",
  undefined: ''
  }

router.get('/', async (req, res) => {
  try {
    const response = await build.getBuildList();
    const data = response;
    res.render('builds', { data, statuses });
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
    res.render('details', { data, statuses });
  } catch (error) {
    res.send(error);
  }
})

router.post('/:commitHash', jsonParser, async (req, res) => {
  let settings = await conf.getConf();
  const git = spawn('git', ['log', req.params.commitHash, '-n 1', '--pretty=format:{"authorName": "%an", "commitMessage": "%s", "commitHash": "%h","branchName": "%D"}'], { cwd: `./clone/${settings.repoName}`});
  git.stdout.on('data', (data) => {
    const commitInfo = JSON.parse(data);
    if (commitInfo.branchName === '') commitInfo.branchName = 'master';
    build.setBuildRequest(commitInfo)
    .then(() => {
      return build.getBuildList();
    })
    .then((response) => {
      const buildId = response[0].id;
      const startBuild = fork('app/building.js');
      startBuild.send({ settings, commitInfo, buildId });
      startBuild.on('exit', (code) => {
        console.log('Код завершения процесса:', code);
      })
      res.sendStatus(200);
    })
    .catch((error) => {
      throw error;
    });
  });
  git.stderr.on('data', (data) => {
    res.send(data);
  });
})

module.exports = router;
